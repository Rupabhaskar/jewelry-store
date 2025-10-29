export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-silver-600">We&apos;d love to hear from you. Send us a message.</p>
      <form className="mt-6 grid gap-4">
        <div>
          <label className="text-sm text-silver-600">Name</label>
          <input className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
        </div>
        <div>
          <label className="text-sm text-silver-600">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
        </div>
        <div>
          <label className="text-sm text-silver-600">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-md border border-silver-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-200" />
        </div>
        <button className="rounded-full bg-gold-400 text-white px-5 py-3 text-sm font-medium hover:bg-gold-600 transition-colors w-fit">Send</button>
      </form>
      <div className="mt-10 rounded-2xl silver-gradient ring-1 ring-silver-200 p-6">
        <div className="font-medium">Customer Care</div>
        <div className="text-sm text-silver-600 mt-1">Mon–Sat, 9am–6pm IST</div>
        <div className="text-sm mt-2">Email: care@aurelia.example</div>
      </div>
    </div>
  );
}


