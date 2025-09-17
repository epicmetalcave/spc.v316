const Dashboard = {
    init() {
        // Create container
        const container = document.createElement('div');
        container.id = 'dashboard';
        document.body.appendChild(container);
        
        // Create first panel
        const panel = document.createElement('div');
        panel.className = 'panel active';
        panel.innerHTML = 'Plugin Library';
        container.appendChild(panel);
        
        console.log('Dashboard initialized');
    }
};

export default Dashboard;