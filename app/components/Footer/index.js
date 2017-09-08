import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

let padding = {
  padding: '2em'
};

function Footer() {
  return (
    <Wrapper style={padding}>
      {/*<section>*/}
        {/*<FormattedMessage {...messages.licenseMessage} />*/}
      {/*</section>*/}
      {/*<section>*/}
        {/*<LocaleToggle />*/}
      {/*</section>*/}
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://www.linkedin.com/in/dominik-maszczyk/">Dominik Maszczyk</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
