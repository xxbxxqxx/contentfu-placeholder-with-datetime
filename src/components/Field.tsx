import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Note,
  Paragraph
} from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import dayjs from 'dayjs';

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
  const { sdk } = props;
  const createdAtRaw = new Date( sdk.entry.getSys().createdAt );
  const createdAt = dayjs(createdAtRaw).format("YYYYMMDD_HH:mm");
  const [inputSlug, setInputSlug] = useState(createdAt);

  useEffect(() => {
    sdk.field.setValue(inputSlug)
  })

  //記事ID使いたい場合: sdk.entry.getSys().id

  return (
    <>
      <TextInput
        defaultValue={sdk.field.getValue()
         ? sdk.field.getValue()
         : createdAt
        } 
        onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
          ): void => setInputSlug(ev.target.value)
        }
      />
    </>
  );
};

export default Field;
