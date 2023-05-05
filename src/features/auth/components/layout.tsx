import { layoutProp } from "..";

export const Layout = ({ title, children }: layoutProp) => {
  return (
    <div className="container mt-5">
      <div className="col-4 m-auto  p-3 forms">
        <h1 className="text-primary text-center mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
};
