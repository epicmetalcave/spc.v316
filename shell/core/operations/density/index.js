// shell/core/operations/density/index.js
const operations = require('../index');

const density = {
    scope: 'shell',
    ratios: {
        information: 0.9,     // Content, data, icons
        structure: 0.1,       // Navigation, borders, layout
        decoration: 0         // Marketing, engagement, polish
    },
    
    thresholds: {
        minInformation: 0.80,
        maxStructure: 0.20,
        maxDecoration: 0.01
    },
    
    exceptions: new Set(),
    
    addException(systemName) {
        this.exceptions.add(systemName);
        return true;
    },
    
    enforce(target, name) {
        if (name && this.exceptions.has(name)) {
            return { passed: true, failed: false, details: ['Exception granted'] };
        }
        
        const metrics = this.measure(target);
        const result = {
            passed: true,
            failed: false,
            details: []
        };
        
        if (metrics.informationRatio < this.thresholds.minInformation) {
            result.failed = true;
            result.passed = false;
            result.details.push(`Information: ${metrics.informationRatio} < ${this.thresholds.minInformation}`);
        }
        
        if (metrics.structureRatio > this.thresholds.maxStructure) {
            result.failed = true;
            result.passed = false;
            result.details.push(`Structure: ${metrics.structureRatio} > ${this.thresholds.maxStructure}`);
        }
        
        if (metrics.decorationRatio > this.thresholds.maxDecoration) {
            result.failed = true;
            result.passed = false;
            result.details.push(`Decoration: ${metrics.decorationRatio} > ${this.thresholds.maxDecoration}`);
        }
        
        return result;
    },
    
    measure(target) {
        const metrics = {
            elements: 0,
            information: 0,
            structure: 0,
            decoration: 0,
            informationRatio: 0,
            structureRatio: 0,
            decorationRatio: 0
        };
        
        if (target.render || target.display || target.interface) {
            Object.keys(target).forEach(key => {
                metrics.elements++;
                
                if (key.includes('data') || key.includes('content') || 
                    key.includes('value') || key.includes('info')) {
                    metrics.information++;
                } else if (key.includes('nav') || key.includes('menu') || 
                           key.includes('border') || key.includes('layout')) {
                    metrics.structure++;
                } else if (key.includes('style') || key.includes('animate') || 
                           key.includes('gradient') || key.includes('shadow')) {
                    metrics.decoration++;
                }
            });
        }
        
        if (metrics.elements > 0) {
            metrics.informationRatio = metrics.information / metrics.elements;
            metrics.structureRatio = metrics.structure / metrics.elements;
            metrics.decorationRatio = metrics.decoration / metrics.elements;
        }
        
        return metrics;
    },
    
    validate(target) {
        if (!target.interface && !target.render && !target.display) {
            return [];  // No violations for non-UI systems
        }
        
        const violations = [];
        const metrics = this.measure(target);
        
        if (metrics.informationRatio < this.thresholds.minInformation) {
            violations.push(`Low information density: ${Math.round(metrics.informationRatio * 100)}%`);
        }
        
        if (metrics.decorationRatio > this.thresholds.maxDecoration) {
            violations.push(`Contains decoration: ${Math.round(metrics.decorationRatio * 100)}% - weak product signal`);
        }
        
        return violations;
    },
    
    execute() {
        return {
            ratios: this.ratios,
            philosophy: "Strong tools need no decoration"
        };
    }
};

operations.register('density', density);
module.exports = density;

/*
DENSITY CONSTRAINT

Enforces 90/10/0 interface ratios for shell plugins.
Phase 0: Applied to all UI components.

RATIOS:
- 90% information (utility)
- 10% structure (access)  
- 0% decoration (marketing)
*/