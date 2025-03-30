// import React from "react";
// import styles from "./Courses.module.css";
// import { motion } from "framer-motion";

// const CoursesPage = () => {
//     return (
//         <motion.div className={styles.container}>
//             <h2 className={styles.title}>Our Courses</h2>

//             <motion.div className={styles.courseGrid}>
//                 {/* Course Card */}
//                 <motion.div
//                     className={styles.courseCard}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                 >
//                     <img src={"http://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="React Course" className={styles.courseImage} />
//                     <h1 className={styles.courseTitle}>React Course</h1>

//                     {/* Instructor Details */}
//                     <div className={styles.instructor}>
//                         <img src={"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="Instructor" />
//                         <h6>John Doe</h6>
//                     </div>

//                     {/* Course Level */}
//                     <button className={styles.levelBadge}>Beginner</button>

//                     {/* Price */}
//                     <h6 className={styles.price}>$49.99</h6>
//                 </motion.div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default CoursesPage;



import React from "react";
import styles from "./Courses.module.css";
import { motion } from "framer-motion";

const coursesData = [
    {
        id: 1,
        title: "React for Beginners",
        description: "Learn the fundamentals of React and build your first app.",
        image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
        instructor: {
            name: "John Doe",
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        level: "Beginner",
        price: 49.99,
        lessons: 20,
        duration: "5h 30m",
        rating: 4.5
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        description: "Deep dive into JavaScript concepts and ES6 features.",
        image: "https://miro.medium.com/v2/resize:fit:836/1*dbggYEdKfBg-4SqRqrkFow.png",
        instructor: {
            name: "Jane Smith",
            image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
        },
        level: "Intermediate",
        price: 69.99,
        lessons: 30,
        duration: "8h 15m",
        rating: 4.7
    },
    {
        id: 3,
        title: "Full-Stack Web Development",
        description: "Master frontend and backend with MERN stack.",
        image: "https://codingbytes.com/wp-content/uploads/2022/03/full-stack-web-development.jpg",
        instructor: {
            name: "Taylor swift",
            image: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2r"
        },
        level: "Advanced",
        price: 99.99,
        lessons: 40,
        duration: "12h 45m",
        rating: 4.8
    }
];

const CoursesPage = () => {
    return (
        <motion.div
            className={styles.coursesContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={styles.heading}>Our Courses</h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.coursesGrid}>
                {coursesData.map((course) => (
                    <motion.div
                        key={course.id}
                        className={styles.courseCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.1 }}
                    >
                        <img src={course.image} alt={course.title} className={styles.courseImage} />
                        <h3 className={styles.courseTitle}>{course.title}</h3>
                        <p className={styles.courseDescription}>{course.description}</p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={styles.instructor}>
                            <img src={course.instructor.image} alt={course.instructor.name} className={styles.instructorImage} />
                            <h6 className={styles.instructorName}>{course.instructor.name}</h6>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={styles.courseDetails}>
                            <span className={styles.level}>{course.level}</span>
                            <span className={styles.price}>${course.price}</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={styles.extraDetails}>
                            <span>📚 {course.lessons} Lessons</span>
                            <span>⏳ {course.duration}</span>
                            <span>⭐ {course.rating}</span>
                        </motion.div>

                        <button className={styles.enrollButton}>Enroll Now</button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CoursesPage;
