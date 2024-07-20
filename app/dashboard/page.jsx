
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const page = () => {
  return (
    <div className="p-10">
      <h1 className="text-primary text-3xl font-bold my-1">
        Create and start your mock-interview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  );
};

export default page;
