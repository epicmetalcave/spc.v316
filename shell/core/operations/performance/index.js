// operations/performance/index.js
const operations = require('../index');

const performance = {
    limits: {
        size: 25 * 1024,    // 25KB radical constraint
        latency: 8,         // 8ms half frame budget
        nodes: 50           // 50 nodes brutal simplicity
    },
    
    measure: function(target) {
        return {
            size: this.measureSize(target),
            latency: this.measureLatency(target),
            nodes: this.measureNodes(target)
        };
    },
    
    measureSize: function(target) {
        if (typeof target === 'string') {
            return Buffer.byteLength(target, 'utf8');
        }
        if (typeof target === 'function') {
            return Buffer.byteLength(target.toString(), 'utf8');
        }
        return Buffer.byteLength(JSON.stringify(target), 'utf8');
    },
    
    measureLatency: function(target) {
        if (typeof target !== 'function') return 0;
        
        const start = Date.now();
        target();
        return Date.now() - start;
    },
    
    measureNodes: function(target) {
        // Node count only measurable in browser
        // Returns 0 in Node.js environment
        return 0;
    },
    
    grade: function(target) {
        const metrics = this.measure(target);
        
        // Inverted scoring: smaller = better
        const sizeGrade = (this.limits.size / Math.max(metrics.size, 1)) * 100;
        const latencyGrade = (this.limits.latency / Math.max(metrics.latency, 0.1)) * 100;
        
        const grade = Math.round((sizeGrade * 0.5 + latencyGrade * 0.5));
        
        return {
            grade,
            status: grade >= 100 ? 'PASS' : 'FAIL',
            breakdown: {
                size: Math.round(sizeGrade),
                latency: Math.round(latencyGrade)
            },
            metrics,
            limits: this.limits
        };
    },
    
    validate: function(target) {
        const violations = [];
        const gradeResult = this.grade(target);
        
        if (gradeResult.breakdown.size < 100) {
            violations.push(`Size ${gradeResult.breakdown.size}% (${gradeResult.metrics.size}/${this.limits.size})`);
        }
        if (gradeResult.breakdown.latency < 100) {
            violations.push(`Latency ${gradeResult.breakdown.latency}% (${gradeResult.metrics.latency}ms/${this.limits.latency}ms)`);
        }
        
        return violations;
    },
    
    enforce: function(target) {
        const gradeResult = this.grade(target);
        
        return {
            failed: gradeResult.grade < 100,
            grade: gradeResult.grade,
            breakdown: gradeResult.breakdown,
            metrics: gradeResult.metrics,
            limits: this.limits
        };
    },
    
    execute: function() {
        return {
            limits: this.limits,
            grading: {
                "200%": "Half the limit (excellent)",
                "100%": "At limit (acceptable)",
                "50%": "Double the limit (failing)"
            }
        };
    }
};

operations.register('performance', performance);
module.exports = performance;

/*
PERFORMANCE CONSTRAINT

Radical 25KB/8ms/50-node limits with grading.

GRADING:
- 200% = Half the limit (excellent)
- 100% = At limit (acceptable)  
- <100% = Exceeds limit (failing)

PHILOSOPHY:
Norton Commander ran in 640KB.
These constraints enforce that efficiency.
*/