interface H2TitleProps {
  titleText: string;
  titleColor?: string;
  textAlign?: string;
  maxWidth?: string;
}
const H2Title = ({ titleText, titleColor, textAlign, maxWidth }: H2TitleProps) => {
  return ( 
    <h2 className={`text-xl md:text-2xl xl:text-3xl 2xl:text-4xl split-text font-light leading-[1.111111111111111] ${titleColor || "text-black"} ${textAlign || "text-left"} 
    ${maxWidth ? `max-w-[${maxWidth}]` : ""} lettersp-4`}>
      {titleText}
    </h2>
   );
}
 
export default H2Title;