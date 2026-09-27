export default function Footer() {
  return (
    <footer className="bg-forest-950 border-t border-cream-50/10 py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/50 text-center sm:text-left">
        <p>
          © {new Date().getFullYear()} Green Ideas Solutions & Consulting · Miljan Žikić PR
          inženjerske delatnosti i tehničko savetovanje
        </p>
        <p>MB: 67226259 · PIB: 113971031</p>
      </div>
    </footer>
  )
}
