import { i18n } from 'presentation/commons/locale';
import './SelectLanguage.css';

const SelectLanguage = (): JSX.Element => {
  return (
    <div>
      <button
        className="button pt"
        type="submit"
        onClick={() => {
          i18n.changeLanguage('pt');
        }}
      ></button>
      <button
        className="button en"
        type="submit"
        onClick={() => {
          i18n.changeLanguage('en');
        }}
      ></button>
    </div>
  );
};

export { SelectLanguage };
