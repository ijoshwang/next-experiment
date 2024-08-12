import { ErrorCode } from '@/types/error';

export const errorMessages: Record<ErrorCode | string, string> = {
  [ErrorCode.EmailNotRegistered]: 'Email or password is not correct',
  [ErrorCode.PasswordCannotBeEmpty]: 'Password can not be empty',
  [ErrorCode.WrongPassword]: 'Email or password is not correct',
  [ErrorCode.EmailNotVerified]: 'Please check your email for verification',
  [ErrorCode.CredentialsSignin]: 'Invalid email or password',
  DefaultLoginMessage:
    'Your account counld not be accessed. Please try again later!',
};
