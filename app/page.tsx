import '@root/global.scss';

import DefaultLayout from '@components/DefaultLayout';
import Navbar from '@root/components/Navbar';
import GutterContainer from '@root/components/GutterContainer';

export default async function Page(props) {
  return (
    <DefaultLayout>
      <Navbar />
      <GutterContainer>
        <div></div>
      </GutterContainer>
    </DefaultLayout>
  );
}
