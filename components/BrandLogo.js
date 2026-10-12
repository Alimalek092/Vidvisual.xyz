import Link from 'next/link';

export default function BrandLogo({ href = '/', size = 32, showText = true, className = '' }) {
  const content = (
    <>
      <img
        src="/logo.png"
        alt="vidvisual logo"
        className="brand-icon"
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      {showText && <span>vidvisual</span>}
    </>
  );

  if (!href) {
    return <span className={`brand vv-hand ${className}`}>{content}</span>;
  }

  return (
    <Link href={href} className={`brand vv-hand ${className}`}>
      {content}
    </Link>
  );
}
