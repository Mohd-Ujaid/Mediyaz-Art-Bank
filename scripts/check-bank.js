const mongoose = require('mongoose');
const uri = 'mongodb+srv://mdujjaid0786_db_user:hGvZqnj32Bm3KOrc@cluster0.yvprhjr.mongodb.net/mediyaz';

async function run() {
  await mongoose.connect(uri);
  const docEgg = await mongoose.connection.db.collection('egg_donor_registrations').findOne();
  console.log('Sample egg bankDetails:', docEgg ? docEgg.bankDetails : null);
  const docSperm = await mongoose.connection.db.collection('sperm_donor_registrations').findOne();
  console.log('Sample sperm bankDetails:', docSperm ? docSperm.bankDetails : null);
  await mongoose.disconnect();
}
run();
