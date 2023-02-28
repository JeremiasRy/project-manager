--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    projectid integer NOT NULL,
    title character varying(50),
    description text,
    completed boolean DEFAULT false,
    created_at date DEFAULT now(),
    due_date date,
    completed_at date,
    start_date date DEFAULT now()
);


ALTER TABLE public.project OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.projectid;


--
-- Name: project_user_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_user_map (
    userid integer NOT NULL,
    projectid integer NOT NULL
);


ALTER TABLE public.project_user_map OWNER TO postgres;

--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    taskid integer NOT NULL,
    title character varying(50),
    description text,
    completed boolean DEFAULT false,
    created_at date DEFAULT now(),
    due_date date,
    completed_at date,
    projectid integer,
    start_date date DEFAULT now()
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.taskid;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    userid integer NOT NULL,
    username character varying(50),
    password character varying(100),
    created_at date DEFAULT now()
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".userid;


--
-- Name: user_task_map; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_task_map (
    userid integer NOT NULL,
    taskid integer NOT NULL
);


ALTER TABLE public.user_task_map OWNER TO postgres;

--
-- Name: project projectid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project ALTER COLUMN projectid SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Name: task taskid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN taskid SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: user userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (projectid, title, description, completed, created_at, due_date, completed_at, start_date) FROM stdin;
19	Build a house	I want to live in a nice house, So let's try and build one! Hope we get it done before christmas.	f	2023-02-25	2023-11-18	\N	2023-03-01
\.


--
-- Data for Name: project_user_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_user_map (userid, projectid) FROM stdin;
1	19
2	19
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (taskid, title, description, completed, created_at, due_date, completed_at, projectid, start_date) FROM stdin;
13	Foundation	We'll try to get the foundations ready quickly.	f	2023-02-25	2023-03-14	\N	19	2023-03-01
14	Walls	Some nice heavy walls to protect from winter.	f	2023-02-25	2023-03-31	\N	19	2023-03-15
15	Roof	Make sure it holds water!!!	f	2023-02-25	2023-05-01	\N	19	2023-04-01
16	Windows	I do want some windows on my house	t	2023-02-25	2023-05-18	2023-02-25	19	2023-05-01
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (userid, username, password, created_at) FROM stdin;
1	Jeremias	AQAAAAEAACcQAAAAEALXabzxyfzJgR7U/6J/ZwuwFL74FeGBP+4LVARamt9Sc9z8x1IRyLpVjWZi8tB1AQ==	\N
2	Lennon	AQAAAAEAACcQAAAAEExTIh+o7z88VlQMVJQxTZ3H/5B2VqytpfKH5tI7Hm9mT0ZycPGrFU+eSt94pX71eA==	\N
3	Luan	AQAAAAEAACcQAAAAEE0nl34tXmWtX/u4Wa1hHXjiucg2QIre1bsMNaR1y7gRVZZiLfQsxTfsAy9zhpdiyg==	2023-01-30
6	Jahas	AQAAAAEAACcQAAAAEFn7WzCizYoGKMpaR3DCNZHYQ+2KDwYApJkr3UDoyYhJcZ/wRhnRlLSlE9sX9kpPQw==	2023-02-14
\.


--
-- Data for Name: user_task_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_task_map (userid, taskid) FROM stdin;
1	13
6	16
\.


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 19, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 16, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (projectid);


--
-- Name: project_user_map project_user_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_user_map
    ADD CONSTRAINT project_user_map_pkey PRIMARY KEY (userid, projectid);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (taskid);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (userid);


--
-- Name: user_task_map user_task_map_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_map
    ADD CONSTRAINT user_task_map_pkey PRIMARY KEY (userid, taskid);


--
-- Name: user user_unq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unq UNIQUE (username);


--
-- Name: project_user_map project_user_map_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_user_map
    ADD CONSTRAINT project_user_map_projectid_fkey FOREIGN KEY (projectid) REFERENCES public.project(projectid) ON DELETE CASCADE;


--
-- Name: project_user_map project_user_map_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_user_map
    ADD CONSTRAINT project_user_map_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(userid) ON DELETE CASCADE;


--
-- Name: task task_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_projectid_fkey FOREIGN KEY (projectid) REFERENCES public.project(projectid) ON DELETE CASCADE;


--
-- Name: user_task_map user_task_map_taskid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_map
    ADD CONSTRAINT user_task_map_taskid_fkey FOREIGN KEY (taskid) REFERENCES public.task(taskid) ON DELETE CASCADE;


--
-- Name: user_task_map user_task_map_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_map
    ADD CONSTRAINT user_task_map_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(userid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

