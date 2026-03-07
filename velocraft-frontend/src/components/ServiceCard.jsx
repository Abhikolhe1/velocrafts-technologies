export default function ServiceCard({ icon, title, description }) {
  return (
    <article className="group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/30 hover:-translate-y-2 flex flex-col h-[300px] lg:h-[360px]">
      <div className="w-14 h-14 mb-4 flex-shrink-0 text-primary group-hover:text-accent transition-colors duration-300">
        {icon}
      </div>
      <h3
        className="text-xl font-semibold text-primary mb-2 flex-shrink-0 group-hover:text-secondary transition-colors"
        title={title}
      >
        {title}
      </h3>
      <p
        className="text-gray-500 text-xs md:text-sm leading-relaxed overflow-y-auto flex-1 min-h-0"
        title={description}
      >
        {description}
      </p>
    </article>
  );
}
