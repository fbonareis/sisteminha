import { Input } from '@rocketseat/unform';
import styled from 'styled-components/macro';
import tw from 'tailwind.macro';

export const Field = styled(Input)`
  ${tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`};
`;
