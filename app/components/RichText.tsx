import { type PortableTextProps, PortableText } from "@portabletext/react";

export default function RichText({ ...rest }: PortableTextProps) {
  return <PortableText {...rest} />;
}
