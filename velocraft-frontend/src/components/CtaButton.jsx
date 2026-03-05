import { Link } from 'react-router-dom';

/* Request Quote style: same look across navbar and all pages */
const requestQuoteStyle =
  'inline-block bg-accent text-primary font-semibold rounded-lg hover:bg-[#e6a200] transition-all duration-200 hover:scale-105';

const variantStyles = {
  primary: `${requestQuoteStyle} px-8 py-4`,
  primaryCompact: `${requestQuoteStyle} px-6 py-3`,
  secondary:
    'inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors',
  link: 'inline-flex items-center text-accent font-semibold hover:underline',
  nav: `${requestQuoteStyle} px-5 py-2.5`,
  navMobile: 'bg-accent text-primary font-semibold px-5 py-3 rounded-lg text-center block w-full hover:bg-[#e6a200] transition-all duration-200',
};

const ArrowIcon = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/**
 * CTA button component. Use for "Start your project", "Get in touch", etc.
 * Do not use for PortfolioCard "View Details" button.
 */
export default function CtaButton({
  to,
  href,
  variant = 'primary',
  compact = false,
  showArrow = false,
  children,
  className = '',
  onClick,
}) {
  const styleKey =
    variant === 'primary' && compact ? 'primaryCompact' : variant;
  const combinedClass = `${variantStyles[styleKey]} ${className}`.trim();

  const content = (
    <>
      {children}
      {(showArrow || variant === 'link') && <ArrowIcon />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClass} onClick={onClick}>
      {content}
    </button>
  );
}
