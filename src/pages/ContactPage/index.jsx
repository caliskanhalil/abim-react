import React from "react";
import { Helmet } from "react-helmet";
import Contact from "../../pages/Home/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>İletişim - ABİM Adana Anadolu Gençlik Derneği</title>
        <meta
          name="description"
          content="Adana Anadolu Gençlik Derneği ile iletişime geçin. Adres: Türkocağı, 24014. Sk. No:2, 01020 Seyhan/Adana"
        />
        <meta
          name="keywords"
          content="ABİM iletişim, Adana Gençlik Derneği iletişim, AGD Adana iletişim"
        />
        <meta
          property="og:title"
          content="İletişim - ABİM Adana Anadolu Gençlik Derneği"
        />
        <meta
          property="og:description"
          content="Adana Anadolu Gençlik Derneği ile iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.abimagd.com/iletisim" />
        <meta
          property="og:image"
          content="https://www.abimagd.com/contact-og-image.jpg"
        />
        <link rel="canonical" href="https://www.abimagd.com/iletisim" />
      </Helmet>

      <div className="">
        <Contact showContactInfo={true} />

        {/* Map Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Konum</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.8950419533785!2d35.33155!3d36.982291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f8b2d25c5e3%3A0x5d5c731b8f8b8f1a!2sAnadolu%20Gen%C3%A7lik%20Derne%C4%9Fi%20Adana%20%C5%9Eubesi!5e0!3m2!1str!2str!4v1647951661026!5m2!1str!2str"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
