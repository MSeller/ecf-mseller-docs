export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MSeller eCF",
    url: "https://ecf.mseller.app",
    logo: "https://ecf.mseller.app/images/logos/m-mseller.png",
    description:
      "Plataforma de integración para Facturación Electrónica (eCF) en República Dominicana certificada por DGII",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DO",
      addressLocality: "República Dominicana",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      url: "https://discord.gg/7xnNByfWTG",
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MSeller eCF",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "DOP",
    },
    description:
      "Plataforma API para integración de Facturación Electrónica (e-CF) con DGII en República Dominicana. Simplifica la implementación de Comprobantes Fiscales Electrónicos en tu sistema.",
    featureList: [
      "Integración con DGII",
      "Firma electrónica automática",
      "Gestión de certificados digitales",
      "Almacenamiento en la nube",
      "Plan de contingencia",
      "API RESTful",
      "Múltiples entornos (Test, Certificación, Producción)",
    ],
    keywords:
      "facturación electrónica, e-CF, DGII, República Dominicana, comprobantes fiscales electrónicos, API facturación",
  };
}

export function generateHowToSchema() {
  const baseUrl = "https://docs.ecf.mseller.app";

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo certificar tu empresa ante la DGII para Facturación Electrónica (e-CF) en República Dominicana",
    description:
      "Guía completa paso a paso para completar el proceso de certificación CerteCF ante la DGII usando MSeller ECF. Incluye carga de certificado digital, creación de API Key, postulación, pruebas de simulación, descarga de PDFs y declaración jurada.",
    image: `${baseUrl}/images/certification/datos-del-proveedor.png`,
    totalTime: "P1D",
    tool: [
      {
        "@type": "HowToTool",
        name: "Certificado digital (.p12)",
      },
      {
        "@type": "HowToTool",
        name: "Cuenta en MSeller ECF (ecf.mseller.app)",
      },
      {
        "@type": "HowToTool",
        name: "Acceso al portal de certificación DGII",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Cargar certificado digital",
        text: "Suba su archivo .p12 (certificado digital) a la plataforma MSeller ECF para firmar documentos e-CF en el entorno de certificación CerteCF.",
        url: `${baseUrl}/docs/certification/process#paso-1--cargar-certificado-digital`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Crear API Key CerteCF",
        text: "Genere una API Key para el entorno CerteCF que se inyecta automáticamente al enviar documentos de prueba.",
        url: `${baseUrl}/docs/certification/process#paso-2--crear-api-key-para-certecf`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Crear postulación en el portal DGII",
        text: "Registre los datos del software (MSeller, versión 1.0), las URLs de integración y los datos del proveedor (IT SOLUCLICK SRL, RNC 130862346) en el portal de certificación DGII. Genere, firme y suba el XML de postulación.",
        url: `${baseUrl}/docs/certification/process#paso-3--crear-postulación-en-el-portal-dgii`,
        image: `${baseUrl}/images/certification/postulacion.png`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Solicitar aprobación a MSeller",
        text: "Envíe un correo a hello@mseller.app para validar la postulación antes de continuar con las pruebas de simulación.",
        url: `${baseUrl}/docs/certification/process#paso-4--solicitar-aprobación-a-mseller`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Pruebas de simulación e-CF",
        text: "Envíe un documento de prueba por cada tipo de e-CF (31, 32, 33, 34, 41, 43, 44, 45, 46, 47). El backend firma y envía cada documento al entorno CerteCF de DGII automáticamente.",
        url: `${baseUrl}/docs/certification/process#paso-5--pruebas-de-simulación-e-cf`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Descargar PDFs y subirlos al portal DGII",
        text: "Descargue la representación impresa (PDF) de cada documento enviado y súbala manualmente al portal de certificación DGII.",
        url: `${baseUrl}/docs/certification/process#paso-6--descargar-pdfs-y-subirlos-al-portal-dgii`,
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Esperar aprobación de representación impresa",
        text: "DGII revisa los PDFs de representación impresa. Espere la notificación de aprobación por correo electrónico.",
        url: `${baseUrl}/docs/certification/process#paso-7--esperar-aprobación-de-representación-impresa`,
      },
      {
        "@type": "HowToStep",
        position: 8,
        name: "Configurar URLs de producción",
        text: "Actualice las URLs en el portal DGII al entorno de producción: recepción y aprobación comercial a https://ecf.api.mseller.app/eCF. Dejar autenticación en blanco.",
        url: `${baseUrl}/docs/certification/process#paso-8--configurar-urls-de-producción`,
      },
      {
        "@type": "HowToStep",
        position: 9,
        name: "Realizar declaración jurada",
        text: "Descargue, firme y suba el XML de la declaración jurada desde el paso 13 del portal DGII.",
        url: `${baseUrl}/docs/certification/process#paso-9--realizar-declaración-jurada`,
        image: `${baseUrl}/images/certification/declaracion-jurada.png`,
      },
      {
        "@type": "HowToStep",
        position: 10,
        name: "Asignación de roles",
        text: "Asigne el rol de Representante Legal en la Oficina Virtual (OFV) para completar la certificación.",
        url: `${baseUrl}/docs/certification/process#paso-10--asignación-de-roles`,
      },
    ],
    video: {
      "@type": "VideoObject",
      name: "Tutorial: Proceso de certificación DGII con MSeller ECF",
      description:
        "Video tutorial paso a paso para completar la certificación CerteCF ante la DGII usando MSeller ECF para facturación electrónica en República Dominicana.",
      thumbnailUrl:
        "https://img.youtube.com/vi/Y7uITwsA-LE/maxresdefault.jpg",
      uploadDate: "2025-01-01",
      contentUrl: "https://www.youtube.com/watch?v=Y7uITwsA-LE",
      embedUrl: "https://www.youtube.com/embed/Y7uITwsA-LE",
    },
  };
}

export function generateVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Tutorial: Proceso de certificación DGII con MSeller ECF",
    description:
      "Video tutorial paso a paso para completar la certificación CerteCF ante la DGII para emitir Comprobantes Fiscales Electrónicos (e-CF) en República Dominicana usando la plataforma MSeller ECF.",
    thumbnailUrl: "https://img.youtube.com/vi/Y7uITwsA-LE/maxresdefault.jpg",
    uploadDate: "2025-01-01",
    contentUrl: "https://www.youtube.com/watch?v=Y7uITwsA-LE",
    embedUrl: "https://www.youtube.com/embed/Y7uITwsA-LE",
    publisher: {
      "@type": "Organization",
      name: "MSeller eCF",
      logo: {
        "@type": "ImageObject",
        url: "https://ecf.mseller.app/images/logos/m-mseller.png",
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
