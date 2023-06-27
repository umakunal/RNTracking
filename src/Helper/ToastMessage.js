import {showMessage, hideMessage} from 'react-native-flash-message';

const showError = message => {
  showMessage({
    message: message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSucess = message => {
  showMessage({
    message: message,
    type: 'success',
    icon: 'success',
  });
};


export {showError, showSucess};