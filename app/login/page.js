import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Log in to Dashboard',
  description:
    'Log in to your vidvisual dashboard to access your saved whiteboard concept cards, interactive mind maps, and vector PDF study notes.',
  alternates: {
    canonical: 'https://www.vidvisual.xyz/login',
  },
  openGraph: {
    title: 'Log in · vidvisual',
    description: 'Log in to your vidvisual account to view and export your visual YouTube summaries.',
    url: 'https://www.vidvisual.xyz/login',
  },
};

export default function Page() {
  return <AuthForm mode="login" />;
}
