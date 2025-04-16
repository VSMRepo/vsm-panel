import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src="https://raw.githubusercontent.com/MatheusGrilo/XML-Facil-VSM/main/.gitassets/logo.png"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="XML Fácil VSM"
          height={310}
          width={310}
        />
        <div>
          <h1 className="text-5xl font-bold">XML Fácil VSM</h1>
          <p className="py-6">
            Baixe agora mesmo o XML Fácil VSM, e exporte suas notas fiscais de
            forma rápida e fácil.
          </p>
          <Link
            href="https://github.com/matheusgrilo/xml-facil-vsm/releases/latest/download/XML_Facil.exe"
            className="btn btn-primary"
          >
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
