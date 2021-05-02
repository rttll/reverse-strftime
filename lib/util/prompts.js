const prompts = require('prompts');

const clock = async () => {
  let questions = {
    message: 'Do you want 12 or 24 hour time?',
    choices: [
      { title: '12-hour', value: '12-2-digit' },
      { title: '24-hour', value: '24-2-digit' },
    ],
  };
  return await prompts({ type: 'select', name: 'style', ...questions });
};

const hour = async () => {
  let questions = {
    message: 'Zero-padded hour?',
    choices: [
      {
        title: 'Yes',
        value: '24-2-digit',
        description: 'e.g 04',
      },
      {
        title: 'No',
        value: '24-numeric',
        description: 'e.g 4',
      },
    ],
  };
  return await prompts({ type: 'select', name: 'style', ...questions });
};

module.exports = { hour, clock };
