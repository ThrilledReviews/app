import { firestore } from 'firebase-admin';
import { https, Response, config } from 'firebase-functions';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Twilio } from 'twilio';

export const handleZapierRequestFeedback = async (req: https.Request, res: Response) => {
  const apiKey = req.params['apiKey'];
  const twilio = new Twilio(config().twilio.sid, config().twilio.token);
  const userDoc = (await firestore().collection('users').where('apiKey', '==', apiKey).get())
    .docs[0];

  const { customerName, customerPhone } = req.body;

  const phoneNumber = parsePhoneNumber(customerPhone, 'US');
  let from = userDoc.data().appPhone;
  if (!userDoc.data().appPhone) {
    const { phoneNumber: newPhoneNumber } = await twilio.incomingPhoneNumbers.create({
      areaCode: userDoc.get('businessAreaCode'),
      smsUrl: 'https://us-central1-thrill-check.cloudfunctions.net/textResponse',
    });
    await userDoc.ref.set({ appPhone: newPhoneNumber }, { merge: true });
    from = newPhoneNumber;
  }

  if (phoneNumber.isValid()) {
    await twilio.messages.create({
      to: phoneNumber.number as string,
      body: userDoc.data().outreachMessage,
      from,
    });
    const feedbackRequest = await (
      await userDoc.ref.collection('feedbackRequests').add({
        customerName,
        customerPhone: phoneNumber.number,
        createdDate: new Date(),
        resultNumber: -1,
        reviewLinkClicked: false,
      })
    ).get();

    res.status(201).send(feedbackRequest.data());
  } else {
    res.status(400).send({ message: 'Invalid Phone Number' });
  }
};
