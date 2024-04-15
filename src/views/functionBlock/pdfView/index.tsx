import './index.less';

const PdfView = () => {

  return (
    <iframe
      className="container-pdfbox"
      frameBorder="0"
      src={`https://116.63.42.17/staticdata/pdfjs/web/viewer.html?file=https://116.63.42.17/staticdata/pdfFolder/pedoc.pdf`}
    />
  )
};

export default PdfView;
