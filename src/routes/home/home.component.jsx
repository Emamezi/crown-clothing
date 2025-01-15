import Directory from "../../components/directory/directory.component";

function Home() {
  return (
    <div>
      {/* render child component of parent route in the outlet */}
      <Directory />;
    </div>
  );
}

export default Home;
