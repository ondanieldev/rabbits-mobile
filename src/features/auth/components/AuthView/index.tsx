import { DefaultView } from '../../../../shared/components/DefaultView';
import { authViewStyles } from './styles';

export interface AuthViewProps {
  children: React.ReactNode;
}

export const AuthView: React.FC<AuthViewProps> = ({ children }) => {
  return <DefaultView style={authViewStyles.container}>{children}</DefaultView>;
};
