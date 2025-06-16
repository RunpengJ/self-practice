import './App.css';
import CourseGrid from './components/CourseGrid';
import mlResources from './mlresources';

const App = () => {
  const totalCourses = mlResources.length;

  return (
    <div className="App">
      <div className="header-section">
        <h1>Machine Learning Resources</h1>
        <h2>Curated collection of the best ML courses and materials</h2>
        <div className="stats-info">
          <div className="stat-item">
            <span className="stat-number">{totalCourses}</span>
            <span className="stat-label">Quality Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2025</span>
            <span className="stat-label">Updated</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Free</span>
            <span className="stat-label">Access</span>
          </div>
        </div>
      </div>

      {/* Community description section */}
      <div className="community-section">
        <div className="community-content">
          <h3>About Our Community</h3>
          <p>
            Welcome to our thriving machine learning community! We're passionate learners, 
            researchers, and practitioners who believe in the power of shared knowledge. 
            Our carefully curated collection brings together the finest ML resources from 
            world-renowned institutions and industry leaders.
          </p>
          <p>
            Whether you're just starting your AI journey or looking to advance your expertise, 
            you'll find courses ranging from beginner-friendly introductions to cutting-edge 
            research topics. Join thousands of learners who are shaping the future of technology 
            through machine learning.
          </p>
          <div className="community-features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>Curated Quality</h4>
                <p>Hand-picked courses from top universities and tech companies</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <div>
                <h4>All Skill Levels</h4>
                <p>From complete beginners to advanced practitioners</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌟</span>
              <div>
                <h4>Always Updated</h4>
                <p>Latest courses and emerging ML trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CourseGrid />
    </div>
  );
};

export default App;