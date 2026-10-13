import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Sign up Free (3 Summaries/Week)',
  description:
    'Create your free vidvisual account. Summarize 3 YouTube videos, podcasts, or college lectures into whiteboard concept cards and mind maps every week forever.',
  alternates: {
    canonical: 'https://www.vidvisual.xyz/register',
  },
  openGraph: {
    title: 'Sign up Free · vidvisual',
    description: 'Create your free vidvisual account and get 3 visual YouTube summaries every week.',
    url: 'https://www.vidvisual.xyz/register',
  },
};

export default function Page() {
  return <AuthForm mode="register" />;
}
