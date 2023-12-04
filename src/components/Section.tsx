
interface sectionProps {
  title: string;
  children: JSX.Element;
}

function Section(props: sectionProps) {
  return (
    <section>
          <h1 className="text-2xl font-semibold mb-4">{ props.title }</h1>
          {props.children}
    </section>
  );
}

export default Section;
