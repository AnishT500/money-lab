import './globals.css';
export const metadata = {
  metadataBase:new URL('https://money-lab-purdue.vercel.app'),
  title:{default:'Money Lab · Financial literacy for students',template:'%s · Money Lab'},
  description:'Learn the basics, experiment with a budget, and try everyday financial decisions in Money Lab.',
};
export default function RootLayout({children}){
  return <html lang="en"><body>{children}</body></html>;
}
