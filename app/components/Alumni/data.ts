export const AlumniBannerData = {
  BannerTitle: "Alumni",
  BannerImg: "",
};

export const mainSection = {
  bgImage: "/images/alumni/main.jpg",
  title: "Alumni",
  title_ar: "خرّيجونا",
  description: "Graduates of BEAM’s Creative Science Schools have been and are currently enrolled at prestigious universities around the world, studying various field; Aerospace Engineering, Applied Earth Sciences, Medical Sciences, Architecture and Engineering, Biotechnology, Genetics and Biomedical Engineering, AI & Computer Science, Sustainable & Renewable Energy, Business & Administration.",
  description_ar: " خريجو مدارس الإبداع العلمي التابعة لمؤسسة بوخاطر للتعليم 'بيم' يتابعون دراساتهم العليا في أرقى الجامعات حول العالم. "
}

export const countries = [
  {
    name: "United Kingdom",
    name_ar: "المملكة المتحدة",
    flag: "/images/alumni/flags/uk.svg",
    universities: `
  <ul>
    <li>Queen Mary University of London</li>
    <li>King’s College London</li>
    <li>De Montfort University</li>
    <li>Surrey University</li>
    <li>University College London</li>
    <li>University of Leicester</li>
    <li>St. George’s University of London</li>
    <li>Le Cordon Bleu</li>
    <li>City, University of London</li>
    <li>University of Birmingham</li>
    <li>Aston University Birmingham</li>
    <li>Imperial College</li>
  </ul>
`,
    universities_ar: `
  <ul>
    <li> جامعة كوين ماري في لندن</li>
    <li>كلية كينغز لندن</li>
    <li>جامعة دي مونتفورت</li>
    <li>جامعة ساري</li>
    <li>جامعة كلية لندن</li>
    <li>جامعة ليستر</li>
    <li>لو كوردون بلو</li>
    <li>جامعة سانت جورج في لندن</li>
    <li>لو كوردون بلو</li>
    <li>سيتي ، جامعة لندن</li>
    <li>جامعة برمنجهام</li>
    <li>جامعة أستون برمنغهام</li>
  </ul>
`,

  },
  {
    name: "United States",
    name_ar: "الولايات المتحدة",
    flag: "/images/alumni/flags/us.svg",
    universities: `
  <ul>
    <li>Massachusetts Institute of Technology</li>
    <li>Arizona State University</li>
    <li>Austin Community College</li>
    <li>Virginia Tech University</li>
    <li>Penn State University</li>
    <li>University of California, Berkeley</li>
  </ul>
`,
    universities_ar: `
  <ul>
      <li>معهد ماساتشوستس للتكنولوجيا</li>
      <li>جامعة ولاية أريزونا</li>
      <li>كلية مجتمع أوستن</li>
      <li>جامعة فرجينيا للتكنولوجيا</li>
      <li>جامعة ولاية بنسلفانيا</li>
          <li>جامعة كاليفورنيا، بيركلي</li>
  </ul>
`,

  },
  {
    name: "Canada",
    name_ar: "كندا",
    flag: "/images/alumni/flags/canada.svg",
    universities: `
  <ul>
      <li>McGill University</li>
      <li>University of Guelph</li>
      <li>University of British Columbia</li>
      <li>University of Windsor</li>
      <li>University of Calgary</li>
      <li>Dalhousie University</li>
      <li>York University</li>
      <li>Carleton University</li>
      <li>Western university</li>
  </ul>
`,
    universities_ar: `
  <ul>
      <li>جامعة ماكجيل</li>
      <li>جامعة جيلف</li>
      <li>جامعة كولومبيا البريطانية</li>
      <li>جامعة وندسور</li>
      <li>جامعة كالجاري</li>
      <li>جامعة دالهوزي</li>
      <li>جامعة يورك</li>
      <li>جامعة كارلتون</li>
      <li>الجامعة ويستيرن</li>
  </ul>
`,

  },
];

export const testimonialsSection = {
  headingOne: "See What",
  headingOne_ar: "اكتشف",
  headingTwo: "Our Students Says",
  headingTwo_ar: "آراء طلابنا وتجاربهم",
  items: [
    {
      id: 1,
      name: "Ubadah Sabbagh",
      name_ar: "عبادة سباغ",
      content: `
        <p>
          Ubadah Sabbagh, PhD is a neuroscientist at the McGovern Institute for Brain Research at MIT.
          He studies the role of networks between the thalamus and cortex in neurodevelopmental
          and psychiatric disorders.
        </p>
        <ul>
          <li>Associate in Arts/Science, Longview Community College</li>
          <li>Bachelor of Science, Biology, University of Missouri</li>
          <li>Ph.D in Translational Biology, Medicine, and Health, Virginia Tech</li>
        </ul>
      `,
      content_ar: `
        <p>
        عبادة سباغ عالم أعصاب في معهد ماكغفرن لأبحاث الدماغ في معهد ماساتشوستس للتكنولوجيا. يدرس دور الشبكات العصبية بين المهاد والقشرة في الاضطرابات النمائية العصبية والنفسية.
        </p>
        <ul>
          <li>مشارك في الآداب / العلوم، كلية مجتمع لونجفيلو</li>
          <li>بكالوريوس علوم الأحياء، جامعة ميزوري، كانساس سيتي</li>
          <li>دكتوراه في علم الأحياء والطب والصحة، جامعة فرجينيا للتكنولوجيا</li>
        </ul>
      `,
      profileImage: "/images/alumni/profile1.jpg",
    },
  ],
};