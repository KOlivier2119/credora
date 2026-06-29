package com.credora.service;

import com.credora.dto.ReportDtos;
import com.credora.model.*;
import com.credora.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final LoanApplicationRepository applicationRepository;
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LoanPaymentRepository paymentRepository;

    public ReportService(LoanApplicationRepository applicationRepository, LoanRepository loanRepository,
                         UserRepository userRepository, LoanPaymentRepository paymentRepository) {
        this.applicationRepository = applicationRepository;
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
    }

    public ReportDtos.AdminReportsSummary getAdminReports() {
        List<LoanApplication> apps = applicationRepository.findAllByOrderByCreatedAtDesc();
        List<Loan> loans = loanRepository.findAll();

        long approved = apps.stream().filter(a -> a.getStatus() == ApplicationStatus.APPROVED).count();
        long rejected = apps.stream().filter(a -> a.getStatus() == ApplicationStatus.REJECTED).count();
        long pending = apps.stream().filter(a -> a.getStatus() == ApplicationStatus.PENDING
                || a.getStatus() == ApplicationStatus.PROCESSING).count();

        BigDecimal totalVolume = loans.stream()
                .map(Loan::getPrincipal)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        double avgRate = loans.stream()
                .filter(l -> l.getInterestRate() != null)
                .mapToDouble(l -> l.getInterestRate().doubleValue())
                .average()
                .orElse(0);

        long delinquent = loans.stream().filter(l -> "DELINQUENT".equals(l.getStatus())).count();
        double defaultRate = loans.isEmpty() ? 0 : (delinquent * 100.0 / loans.size());

        ReportDtos.AdminReportsSummary summary = new ReportDtos.AdminReportsSummary();
        summary.setTotalLoanVolume(totalVolume);
        summary.setApprovalRate(apps.isEmpty() ? 0 : approved * 100.0 / apps.size());
        summary.setAverageInterestRate(Math.round(avgRate * 10) / 10.0);
        summary.setDefaultRate(Math.round(defaultRate * 10) / 10.0);
        summary.setTotalApplications(apps.size());
        summary.setApprovedApplications(approved);
        summary.setRejectedApplications(rejected);
        summary.setPendingApplications(pending);
        summary.setLoanPerformance(buildMonthlyPerformance(apps));
        summary.setLoanDistribution(buildLoanDistribution(apps));
        summary.setCreditScoreDistribution(buildCreditBuckets(apps));
        summary.setDefaultRateTrend(buildDefaultTrend(loans));
        return summary;
    }

    public List<ReportDtos.CustomerSummary> getCustomerSummaries() {
        return userRepository.findAll().stream().map(user -> {
            List<LoanApplication> apps = applicationRepository.findByUserOrderByCreatedAtDesc(user);
            List<Loan> loans = loanRepository.findByUserOrderByCreatedAtDesc(user);

            int latestScore = apps.stream()
                    .filter(a -> a.getAiCreditScore() != null)
                    .mapToInt(LoanApplication::getAiCreditScore)
                    .findFirst()
                    .orElse(650);

            BigDecimal borrowed = loans.stream()
                    .map(Loan::getPrincipal)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            long active = loans.stream().filter(l -> "ACTIVE".equals(l.getStatus())).count();
            boolean hasRejected = apps.stream().anyMatch(a -> a.getStatus() == ApplicationStatus.REJECTED);
            String status = active > 0 ? "active" : hasRejected ? "flagged" : "inactive";

            String lastActivity = apps.isEmpty() ? user.getCreatedAt().toString()
                    : apps.get(0).getSubmittedDate() != null ? apps.get(0).getSubmittedDate().toString()
                    : user.getCreatedAt().toString();

            ReportDtos.CustomerSummary cs = new ReportDtos.CustomerSummary();
            cs.setId(user.getId());
            cs.setName(user.getFullName());
            cs.setEmail(user.getEmail());
            cs.setPhone(user.getPhoneNumber());
            cs.setStatus(status);
            cs.setJoinDate(user.getCreatedAt() != null
                    ? user.getCreatedAt().toString().substring(0, 10) : "");
            cs.setCreditScore(latestScore);
            cs.setActiveLoans((int) active);
            cs.setTotalBorrowed(borrowed);
            cs.setLastActivity(lastActivity);
            return cs;
        }).collect(Collectors.toList());
    }

    private List<ReportDtos.MonthlyPerformance> buildMonthlyPerformance(List<LoanApplication> apps) {
        Map<String, ReportDtos.MonthlyPerformance> byMonth = new LinkedHashMap<>();
        LocalDate now = LocalDate.now();
        for (int i = 8; i >= 0; i--) {
            LocalDate month = now.minusMonths(i);
            String label = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            ReportDtos.MonthlyPerformance mp = new ReportDtos.MonthlyPerformance();
            mp.setMonth(label);
            mp.setApplications(0);
            mp.setApprovals(0);
            mp.setRejections(0);
            byMonth.put(month.getYear() + "-" + month.getMonthValue(), mp);
        }
        for (LoanApplication app : apps) {
            if (app.getSubmittedDate() == null) continue;
            String key = app.getSubmittedDate().getYear() + "-" + app.getSubmittedDate().getMonthValue();
            ReportDtos.MonthlyPerformance mp = byMonth.get(key);
            if (mp == null) continue;
            mp.setApplications(mp.getApplications() + 1);
            if (app.getStatus() == ApplicationStatus.APPROVED) mp.setApprovals(mp.getApprovals() + 1);
            if (app.getStatus() == ApplicationStatus.REJECTED) mp.setRejections(mp.getRejections() + 1);
        }
        return new ArrayList<>(byMonth.values());
    }

    private List<ReportDtos.LoanTypeDistribution> buildLoanDistribution(List<LoanApplication> apps) {
        Map<String, ReportDtos.LoanTypeDistribution> map = new LinkedHashMap<>();
        for (String type : List.of("personal", "business", "mortgage", "auto", "education")) {
            ReportDtos.LoanTypeDistribution d = new ReportDtos.LoanTypeDistribution();
            d.setType(capitalize(type));
            d.setAmount(BigDecimal.ZERO);
            d.setCount(0);
            map.put(type, d);
        }
        for (LoanApplication app : apps) {
            String type = app.getLoanType() != null ? app.getLoanType().toLowerCase() : "personal";
            ReportDtos.LoanTypeDistribution d = map.computeIfAbsent(type, t -> {
                ReportDtos.LoanTypeDistribution nd = new ReportDtos.LoanTypeDistribution();
                nd.setType(capitalize(t));
                nd.setAmount(BigDecimal.ZERO);
                nd.setCount(0);
                return nd;
            });
            d.setCount(d.getCount() + 1);
            if (app.getLoanAmount() != null) {
                d.setAmount(d.getAmount().add(app.getLoanAmount()));
            }
        }
        return new ArrayList<>(map.values());
    }

    private List<ReportDtos.CreditScoreBucket> buildCreditBuckets(List<LoanApplication> apps) {
        String[] ranges = {"300-579", "580-629", "630-689", "690-719", "720-850"};
        long[] counts = new long[ranges.length];
        for (LoanApplication app : apps) {
            Integer score = app.getAiCreditScore();
            if (score == null) continue;
            if (score < 580) counts[0]++;
            else if (score < 630) counts[1]++;
            else if (score < 690) counts[2]++;
            else if (score < 720) counts[3]++;
            else counts[4]++;
        }
        List<ReportDtos.CreditScoreBucket> buckets = new ArrayList<>();
        for (int i = 0; i < ranges.length; i++) {
            ReportDtos.CreditScoreBucket b = new ReportDtos.CreditScoreBucket();
            b.setRange(ranges[i]);
            b.setCount(counts[i]);
            buckets.add(b);
        }
        return buckets;
    }

    private List<ReportDtos.MonthlyPerformance> buildDefaultTrend(List<Loan> loans) {
        List<ReportDtos.MonthlyPerformance> trend = new ArrayList<>();
        LocalDate now = LocalDate.now();
        for (int i = 8; i >= 0; i--) {
            LocalDate month = now.minusMonths(i);
            ReportDtos.MonthlyPerformance mp = new ReportDtos.MonthlyPerformance();
            mp.setMonth(month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
            long delinquent = loans.stream()
                    .filter(l -> "DELINQUENT".equals(l.getStatus()))
                    .count();
            mp.setDefaultRate(loans.isEmpty() ? 0 : Math.round(delinquent * 1000.0 / loans.size()) / 10.0);
            trend.add(mp);
        }
        return trend;
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }
}
