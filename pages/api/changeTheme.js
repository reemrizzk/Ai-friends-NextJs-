import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const configFilePath = path.resolve('./pages/config.js');

  const theme = req.body;

  try {
    const configContent = fs.readFileSync(configFilePath, 'utf-8');
    const updatedConfigContent = configContent.replace(/const theme="[^"]*";/, `const theme="${theme}";`);

    fs.writeFileSync(configFilePath, updatedConfigContent, 'utf-8');

    res.status(200).send('Theme updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating theme: ' + error.message);
  }
};
