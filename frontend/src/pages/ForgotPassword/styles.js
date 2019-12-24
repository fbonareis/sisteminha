import { Form as FormBase, Input } from '@rocketseat/unform';
import styled from 'styled-components/macro';
import tw from 'tailwind.macro';

export const Container = styled.div`
  ${tw`flex h-full flex-1 justify-center bg-gray-200`};
`;

export const Content = styled.div`
  ${tw`w-full mt-32 max-w-xs`};
`;

export const Form = styled(FormBase)`
  ${tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`};
`;

export const Heading = styled.h1`
  ${tw`text-4xl font-black mb-4`};
`;

export const FieldGroup = styled.div`
  ${tw`mb-4`};

  span {
    ${tw`text-red-500 text-xs italic`}
  }
`;

export const Field = styled(Input)`
  ${tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`};
`;

export const FieldLabel = styled.label`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

export const Footer = styled.div`
  ${tw`flex items-center justify-between`}
`;

export const ForgotPassword = styled.a`
  ${tw`inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800`}
`;

export const Copyright = styled.p`
  ${tw`text-center text-gray-500 text-xs`}
`;

export const Submit = styled.button.attrs({})`
  ${tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
`;
