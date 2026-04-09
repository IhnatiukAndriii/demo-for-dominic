'use client'

import { useTranslations } from 'next-intl'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default function FAQ() {
  const t = useTranslations('landing.faq')

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
  ]

  return (
    <section id="faq" className="bg-gradient-to-b from-white via-brand-orange-50/30 to-white py-24 lg:py-32 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy text-center mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-brand-navy/70 text-center">
            {t('subtitle')}
          </p>
        </div>

        <Accordion className="divide-y divide-brand-orange-100 border border-brand-orange-100 rounded-2xl overflow-hidden">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} className="bg-white border-b border-brand-orange-100 last:border-b-0">
              <AccordionTrigger className="px-6 py-5 text-lg font-semibold text-brand-navy hover:text-brand-orange hover:no-underline transition-colors rounded-none">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
