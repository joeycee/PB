import { useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";


const BRAND = {
  name: "Performance Building",
  tagline:
    "Energy modelling, airtightness testing, and building-physics consulting for better homes in Wānaka.",
  location: "Wānaka, New Zealand",
  email: "Rowan@performancebuilding.co.nz",
  phone: "+64 223493940",
};




function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, href = "#contact" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ children, href = "#services" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300"
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="mb-3">
          <Badge>{eyebrow}</Badge>
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base leading-relaxed text-zinc-600">{desc}</p>
      ) : null}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-13 w-13 items-center justify-center">
              <img
                src="/logo.svg"
                alt={`${BRAND.name} logo`}
                className="h-20 w-auto"
              />
            </div>

            {/* Brand text hidden on very small screens (optional) */}
            <div className="hidden sm:block leading-tight">
              <div className="text-base font-semibold text-white">{BRAND.name}</div>
              <div className="text-xs uppercase tracking-wide text-white/60">
                {BRAND.location}
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Book a call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Hamburger / X */}
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-[2px] w-5 bg-current transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-[2px] w-5 bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-[2px] w-5 bg-current transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile dropdown panel */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="flex flex-col">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}



function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Gentle parallax for background (moves a little as you scroll)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, 40]);
  const bgScale = shouldReduceMotion ? 1 : 1.05;

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(8px)" },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
  };

  const badgeItem = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background image with subtle parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/hero-wanaka.jpg')",
          y: bgY,
          scale: bgScale,
        }}
      />

      {/* Premium overlay: gradient + vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
      <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_35%,rgba(255,255,255,0.10),rgba(0,0,0,0)_60%)]" />

      {/* Subtle grain (optional vibe) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />

      {/* Content */}
      <Container className="relative z-10 py-20 sm:py-28">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badges */}
          <motion.div className="mb-4 flex flex-wrap gap-2" variants={container}>
            <motion.div variants={badgeItem}>
              <Badge>Energy Modelling</Badge>
            </motion.div>
            <motion.div variants={badgeItem}>
              <Badge>Passive / Building Physics</Badge>
            </motion.div>
            <motion.div variants={badgeItem}>
              <Badge>Airtightness Testing</Badge>
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={item}
          >
            High-performance building consulting for better homes.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-zinc-200"
            variants={item}
          >
            Energy modelling, airtightness testing, and building-physics consulting for
            high-quality homes in Wānaka and across New Zealand.
          </motion.p>

          {/* Buttons */}
          <motion.div className="mt-7 flex flex-wrap gap-3" variants={item}>
            <PrimaryButton href="#contact">Request a quote</PrimaryButton>
            <SecondaryButton href="#services">View services</SecondaryButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="mt-10 grid gap-3 sm:grid-cols-3"
            variants={container}
          >
            <motion.div variants={item}>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="text-sm font-semibold text-white">Clarity</div>
                <div className="mt-1 text-sm text-zinc-200">Simple next steps.</div>
              </div>
            </motion.div>
            <motion.div variants={item}>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="text-sm font-semibold text-white">Accuracy</div>
                <div className="mt-1 text-sm text-zinc-200">Modelling + testing.</div>
              </div>
            </motion.div>
            <motion.div variants={item}>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="text-sm font-semibold text-white">Credibility</div>
                <div className="mt-1 text-sm text-zinc-200">Clean reporting.</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}



function Services() {
  const shouldReduceMotion = useReducedMotion();

  const services = useMemo(
    () => [
      {
        title: "Energy Modelling",
        desc: "Thermal performance modelling to support design decisions, reduce running costs, and improve comfort.",
      },
      {
        title: "Passive Consultancy",
        desc: "Guidance on airtightness, insulation continuity, glazing strategy, ventilation, and thermal bridging.",
      },
      {
        title: "H1 Consulting",
        desc: "Support with NZ Building Code H1 compliance pathway selection and documentation.",
      },
      {
        title: "Blower Door Airtightness Testing",
        desc: "On-site testing, reporting, and practical leakage insights to help you hit airtightness targets.",
      },
      {
        title: "Homestar Certifications",
        desc: "Evidence and documentation support to align your project with Homestar requirements and best practice.",
      },
      {
        title: "WUFI Hygrothermal Analysis",
        desc: "Moisture and durability analysis for wall/roof build-ups to reduce condensation and mould risk.",
      },
    ],
    []
  );

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.12 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 16, filter: "blur(8px)" },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-zinc-800 bg-zinc-900"
    >
      
      {/* Depth overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_70%_at_50%_30%,rgba(255,255,255,0.08),rgba(0,0,0,0)_60%)]" />

      <Container className="relative z-10 py-14 sm:py-20">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-2xl"
        >
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Services
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            A focused set of high-performance services.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-zinc-300">
            Everything you need to design, validate, and document energy-efficient, durable homes —
            delivered with clear outputs.
          </p>
        </motion.div>

        {/* Cards (stagger on scroll) */}
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={item}>
              <div className="group rounded-2xl border border-white/12 bg-white/5 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/7 hover:shadow-lg">
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.desc}</p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}




function Process() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { title: "Discovery", desc: "Quick call to confirm scope, timeline, and the right services." },
    { title: "Model / Test", desc: "Modelling, H1, blower door testing, and/or WUFI as required." },
    { title: "Recommendations", desc: "Clear, practical actions to improve performance and reduce risk." },
    { title: "Deliverables", desc: "Professional reporting and documentation for stakeholders." },
  ];

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.12 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(8px)" },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section id="process" className="relative overflow-hidden border-t border-zinc-800">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/second-image.jpg')" }}
      />

      {/* Progressive tint (lighter → darker) */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/55" />


      {/* Subtle vignette */}
      <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_50%_40%,rgba(255,255,255,0.10),rgba(0,0,0,0)_60%)]" />

      <Container className="relative z-10 py-16 sm:py-24">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-2xl"
        >
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Process
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Simple, repeatable, and built for momentum.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-zinc-200">
            Short feedback loops, clear outputs, and advice that helps projects move forward.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={item}>
              <div className="group min-h-[160px] rounded-2xl border border-white/30 bg-black/40 p-6 backdrop-blur-lg transition hover:-translate-y-1 hover:bg-white/7 hover:shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/30 bg-white/10 text-white">
                    <span className="text-sm font-semibold">{i + 1}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-200">{step.desc}</p>

                {/* subtle hover highlight line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}



function About() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(8px)" },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
  };

  const listContainer = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const listItem = {
    hidden: shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
    show: shouldReduceMotion
      ? { opacity: 1, x: 0 }
      : {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950"
    >
      {/* Subtle dark glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-140px] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 left-[-140px] h-96 w-96 rounded-full bg-white/3 blur-3xl" />
      </div>

      <Container className="relative z-10 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Dark badge */}
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                About
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Building physics, delivered practically.
            </h2>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-300">
              Add your friend’s credentials, tools, and experience here. Keep it short and credible.
            </p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400">
              <p>
                Based in {BRAND.location}, supporting projects from early design through testing and
                documentation. Ideal for architects, designers, builders, and homeowners who want
                comfort and performance without overcomplication.
              </p>
              <p>
                Add specifics: certifications, relevant experience, and the kind of projects
                typically supported.
              </p>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                {/* top highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="text-sm font-semibold text-white">What you’ll get</div>

                <motion.ul
                  className="mt-4 space-y-3 text-sm text-zinc-300"
                  variants={listContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {[
                    "Clear written outputs you can forward to stakeholders",
                    "Practical recommendations that can actually be built",
                    "Reduced risk around moisture, comfort, and compliance",
                    "A consistent process across projects",
                  ].map((text) => (
                    <motion.li key={text} className="flex gap-3" variants={listItem}>
                      <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                      {text}
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Service area
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Central Otago + Remote NZ
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Wānaka • Queenstown • Cromwell • Online
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}



function Contact() {
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const shouldReduceMotion = useReducedMotion();

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "sending", msg: "Sending…" });

    const form = e.currentTarget;

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value,
      details: form.details.value.trim(),
    };

    try {
      const res = await fetch(
        "https://api.performancebuilding.co.nz/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      form.reset();
      setStatus({
        type: "ok",
        msg: "Thanks — your enquiry has been sent. We’ll be in touch shortly.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again or email us directly.",
      });
    }
  }

  const container = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 18, filter: "blur(8px)" },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
  };

  const fieldItem = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-zinc-800">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/floor-image.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />

      <Container className="relative z-10 py-14 sm:py-20">
        <motion.div
          className="grid gap-10 lg:grid-cols-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Left column */}
          <motion.div className="lg:col-span-5" variants={item}>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Contact
            </span>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Let’s talk about your project.
            </h2>

            <p className="mt-3 text-zinc-200">
              Send a few details and we’ll suggest the right service and next steps.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-7" variants={item}>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <motion.form
                onSubmit={onSubmit}
                className="grid gap-4 sm:grid-cols-2"
                variants={container}
              >
                <motion.div variants={fieldItem}>
                  <label className="text-sm font-medium text-white">Name</label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white"
                  />
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label className="text-sm font-medium text-white">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white"
                  />
                </motion.div>

                <motion.div className="sm:col-span-2" variants={fieldItem}>
                  <label className="text-sm font-medium text-white">Service needed</label>
                  <select
                    name="service"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white"
                  >
                    <option>Energy Modelling</option>
                    <option>Passive Consultancy</option>
                    <option>H1 Consulting</option>
                    <option>Blower Door Airtightness Testing</option>
                    <option>Homestar Certifications</option>
                    <option>WUFI Hygrothermal Analysis</option>
                    <option>Not sure — help me choose</option>
                  </select>
                </motion.div>

                <motion.div className="sm:col-span-2" variants={fieldItem}>
                  <label className="text-sm font-medium text-white">Project details</label>
                  <textarea
                    name="details"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white"
                  />
                </motion.div>

                <motion.div className="sm:col-span-2 flex items-center gap-3" variants={fieldItem}>
                  <button
                    type="submit"
                    disabled={status.type === "sending"}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
                  >
                    {status.type === "sending" ? "Sending…" : "Send enquiry"}
                  </button>

                  {status.msg && (
                    <span
                      className={`text-sm ${
                        status.type === "error" ? "text-red-300" : "text-zinc-200"
                      }`}
                    >
                      {status.msg}
                    </span>
                  )}
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <Container className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-400">
            <span className="font-semibold text-white">{BRAND.name}</span> · {BRAND.location}
          </div>

          <div className="text-xs text-zinc-500">
            © {new Date().getFullYear()} · All rights reserved
          </div>
        </div>
      </Container>
    </footer>
  );
}


export default function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Nav />
      <Hero />
      <Services />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
