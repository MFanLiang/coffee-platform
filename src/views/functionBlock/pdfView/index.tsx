import { useState, useEffect } from 'react';
import otherFileName from '@/assets/pedoc.pdf';
import './index.less';

const PdfView = () => {

  const [pdfFileName, setPdfFileName] = useState<any>();

  useEffect(() => {
    setPdfFileName(otherFileName);
  }, []);

  return (
    <iframe
      className="container-pdfbox"
      frameBorder="0"
      src={`/pdfjs-4.0.379-dist/web/viewer.html?file=${pdfFileName}`}
    />
  )
};

export default PdfView;
