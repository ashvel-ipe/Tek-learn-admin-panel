import { useEffect, useState } from "react";

type Course = {
  title: string;
  desc: string;
  price: string;
  duration: string;
  color: string;
};

type AdminPanelProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddCourseProps = {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

type LoginProps = {
  onLogin: () => void;
};

export default function App() {
  const [text, setText] = useState("Internship is live");
  const [courses, setCourses] = useState<Course[]>([
    {
      title: "UI/UX WITH AI",
      desc: "Learn design + AI tools",
      price: "₹9,999",
      duration: "3 months",
      color: "bg-green-700",
    },
  ]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [active, setActive] = useState("Dashboard");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <AdminPanel
          text={text}
          setText={setText}
          courses={courses}
          setCourses={setCourses}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          active={active}
          setActive={setActive}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
  );
}

function AdminPanel({
  text,
  setText,
  courses,
  setCourses,
  editIndex,
  setEditIndex,
  active,
  setActive,
  setLoggedIn,
}: AdminPanelProps) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-[240px] bg-[#0d0d0d] border-r border-white/10 p-6">
        <h2 className="text-xl font-semibold mb-10">Teklearn Admin</h2>

        <div className="space-y-5 text-gray-400">
          <p
            onClick={() => setActive("Dashboard")}
            className={`cursor-pointer ${
              active === "Dashboard" ? "text-white" : "text-gray-400"
            }`}
          >
            Dashboard
          </p>
          <p
            onClick={() => setActive("Courses")}
            className={`cursor-pointer ${
              active === "Courses" ? "text-white" : "text-gray-400"
            }`}
          >
            Courses
          </p>
        </div>

        <button
          onClick={() => setLoggedIn(false)}
          className="mt-10 bg-white text-black px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-semibold mb-10">{active}</h1>

        {active === "Dashboard" && (
          <>
            <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-2xl max-w-xl border border-white/10 shadow-lg">
              <h2 className="text-xl mb-2">Announcement</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Update homepage banner text
              </p>

              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 mb-4 bg-black rounded-lg border border-white/10 outline-none focus:border-white/30"
              />

              <button className="px-6 py-2 bg-white text-black rounded-full hover:opacity-80">
                Save Changes
              </button>
            </div>

            <div className="mt-6 max-w-xl text-gray-300">Sample text :</div>
            <div className="mt-8 max-w-xl bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg text-center">
              <span className="text-yellow-400 font-semibold">Hive</span>{" "}
              <span className="text-gray-200">{text}</span>
              <div className="mt-3 text-sm text-gray-400">details</div>
            </div>
          </>
        )}

        {active === "Courses" && (
          <div className="max-w-xl">
            <h2 className="text-2xl mb-6">Add Course</h2>

            <AddCourse
              courses={courses}
              setCourses={setCourses}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
            />

            <div className="mt-8 space-y-4">
              {courses.map((c, i) => (
                <div key={i} className={`p-6 rounded-2xl ${c.color} relative`}>
                  <button
                    onClick={() => {
                      const updated = courses.filter((_, index) => index !== i);
                      setCourses(updated);
                      if (editIndex === i) {
                        setEditIndex(null);
                      }
                    }}
                    className="absolute top-2 right-2 text-xs bg-black/40 px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setEditIndex(i)}
                    className="absolute top-2 right-20 text-xs bg-black/40 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-sm opacity-80">{c.desc}</p>
                  <p className="mt-2 text-sm">
                    {c.price} • {c.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddCourse({
  courses,
  setCourses,
  editIndex,
  setEditIndex,
}: AddCourseProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (editIndex === null) return;
    const current = courses[editIndex];
    if (!current) return;

    setTitle(current.title);
    setDesc(current.desc);
    setPrice(current.price);
    setDuration(current.duration);
  }, [editIndex, courses]);

  const addCourse = () => {
    if (!title) return;

    const newCourse: Course = {
      title,
      desc,
      price,
      duration,
      color: editIndex !== null ? courses[editIndex]?.color ?? "bg-purple-700" : "bg-purple-700",
    };

    if (editIndex !== null) {
      const updated = [...courses];
      updated[editIndex] = newCourse;
      setCourses(updated);
      setEditIndex(null);
    } else {
      setCourses([newCourse, ...courses]);
    }

    setTitle("");
    setDesc("");
    setPrice("");
    setDuration("");
  };

  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
      <label htmlFor="course-title" className="block mb-2 text-gray-300">
        Course Name:
      </label>
      <input
        id="course-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-3 bg-black rounded-lg"
      />

      <label htmlFor="course-description" className="block mb-2 text-gray-300">
        Description:
      </label>
      <input
        id="course-description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full mb-3 p-3 bg-black rounded-lg"
      />

      <label htmlFor="course-price" className="block mb-2 text-gray-300">
        Price:
      </label>
      <input
        id="course-price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-3 p-3 bg-black rounded-lg"
      />

      <label htmlFor="course-duration" className="block mb-2 text-gray-300">
        Duration:
      </label>
      <input
        id="course-duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full mb-4 p-3 bg-black rounded-lg"
      />

      <button
        onClick={addCourse}
        className="bg-white text-black px-5 py-2 rounded-full"
      >
        {editIndex !== null ? "Update Course" : "Add Course"}
      </button>
    </div>
  );
}

function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#111] p-10 rounded-3xl w-[400px] text-center border border-white/10">
        <h1 className="text-3xl mb-8">Login</h1>

        <input
          placeholder="Email"
          className="w-full mb-4 p-3 bg-black rounded-lg border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-black rounded-lg border border-white/10"
        />

        <button
          onClick={onLogin}
          className="w-full bg-white text-black py-2 rounded-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
