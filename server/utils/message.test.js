 const expect = require('expect');
 const {generateMessage} = require('./message');

 describe('generateMessage', ()=> {
 	it('should generate correct message object', ()=> {
 		const [from, text] = ['Jen','Some message'],
 		message = generateMessage(from, text);
 		expect(message.createdAt).toBeA('number');
 		expect(message).toInclude({from,text});

 	})
 })