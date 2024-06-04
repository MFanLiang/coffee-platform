import classnames from 'classnames';
import style from './index.module.less';

const DragController = () => {

  return (
    <div className={classnames('card', style.dragControllerBox)}>
      <p>拖拽控制器</p>
    </div>
  );
};

export default DragController;
