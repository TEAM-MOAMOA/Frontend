export interface WritingProps {
  contents: WritingInfoProps;
}

export interface WritingInfoProps {
  title: string;
  personnel: number;
  category: string;
  tag: string[];
  appeal: string;
  price: number;
}

export interface PriceProps extends Pick<WritingInfoProps, 'price'>{}