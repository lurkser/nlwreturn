import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:img/png;base64,3214346574654zcv',
    })).resolves.not.toThrow();
  });

  expect(createFeedbackSpy).toHaveBeenCalled();
  expect(sendMailSpy).toHaveBeenCalled();


  it('should not be able to submit feedback without a type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:img/png;base64,3214346574654zcv',
    })).resolves.toThrow();
  });

  it('should not be able to submit feedback without a comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:img/png;base64,3214346574654zcv',
    })).resolves.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemplo',
      screenshot: '123',
    })).resolves.toThrow();
  });
});