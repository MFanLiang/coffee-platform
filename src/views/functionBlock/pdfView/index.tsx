import './index.less';

const PdfView = () => {

  return (
    <iframe
      className="container-pdfbox"
      frameBorder="0"
      src={`https://xiaomenglovecoffee.top/staticdata/pdfjs/web/viewer.html?file=https://xiaomenglovecoffee.top/staticdata/pdfFolder/pedoc.pdf`}
    />
  )
};

export default PdfView;
