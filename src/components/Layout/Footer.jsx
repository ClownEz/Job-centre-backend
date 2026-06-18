import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <span>Вакансии</span>
          <span>Отклики</span>
          <span>О проекте</span>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} JobSearch. Курсовая работа.</p>
      </div>
    </footer>
  );
}
