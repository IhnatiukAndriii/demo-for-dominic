'use client'

import { useTranslations } from 'next-intl'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default function FaqSection() {
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
    <section id="faq" className="bg-white py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        <Accordion className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} className="bg-white">
              <AccordionTrigger className="px-6 py-4 text-base font-semibold text-gray-900 hover:no-underline hover:bg-gray-50 transition-colors rounded-none">
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
