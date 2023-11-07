import fs from 'fs';
import path from 'path';
import qs from 'querystring';

export default (req, res) => {
  const configFilePath = path.resolve('./pages/config.js');
  const formData = new URLSearchParams(req.body);
  const name = formData.get('name');
  const description = formData.get('description');
  const selectedImage = formData.get('selectedImage');

  try {
    const configContent = fs.readFileSync(configFilePath, 'utf-8');
    const updatedBotsArray = `const bots = [\n${configContent.match(/const bots = \[([\s\S]*?)\];/)[1]}\n  { name: "${name}", prompt: "Act as ${description}. reply to this:", image: "${selectedImage}" },\n];`;

    const updatedConfigContent = configContent.replace(/const bots = \[([\s\S]*?)\];/, updatedBotsArray);

    const substring = 'name: "' + name + '"';

    if (configContent.indexOf(substring) !== -1) {
      res.status(409).send('There is already a bot with that name');
    } else {
      fs.writeFileSync(configFilePath, updatedConfigContent, 'utf-8');
      res.status(200).send('Bot added successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding bot: ' + error.message);
  }
};
