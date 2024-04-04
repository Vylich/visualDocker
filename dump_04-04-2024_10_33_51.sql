--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE visual;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:6bpeflolUJY5pdRfCasD3A==$MnGAWNMhZOVlY8hMWVf8hwRa/ah6RczPoSpK+uHltPw=:duKbhcNdy5yoZtw2x4Q9VFjRnxymI4DapsA0ZS7MBJw=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "visual" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

--
-- Name: visual; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE visual WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE visual OWNER TO postgres;

\connect visual

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

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_account (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    date_register timestamp with time zone NOT NULL,
    last_join timestamp with time zone NOT NULL,
    is_admin boolean NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    is_superuser boolean NOT NULL,
    avatar character varying(100) NOT NULL,
    description text NOT NULL,
    url character varying(100) NOT NULL,
    birthday timestamp with time zone,
    gender character varying(10) NOT NULL,
    subscription character varying(10)
);


ALTER TABLE public.accounts_account OWNER TO postgres;

--
-- Name: accounts_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.accounts_account ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: chat_conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_conversation (
    id bigint NOT NULL,
    start_time timestamp with time zone NOT NULL,
    initiator_id bigint,
    receiver_id bigint
);


ALTER TABLE public.chat_conversation OWNER TO postgres;

--
-- Name: chat_conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chat_conversation ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.chat_conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: chat_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_message (
    id bigint NOT NULL,
    text character varying(500) NOT NULL,
    attachment character varying(100) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    conversation_id_id bigint NOT NULL,
    sender_id bigint,
    receiver_id bigint,
    read boolean NOT NULL
);


ALTER TABLE public.chat_message OWNER TO postgres;

--
-- Name: chat_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chat_message ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.chat_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: followers_follower; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers_follower (
    id bigint NOT NULL,
    created_date timestamp with time zone NOT NULL,
    author_id bigint NOT NULL,
    follower_id bigint NOT NULL,
    notification_id bigint NOT NULL
);


ALTER TABLE public.followers_follower OWNER TO postgres;

--
-- Name: followers_follower_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.followers_follower ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.followers_follower_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notifications_notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications_notification (
    id bigint NOT NULL,
    send boolean NOT NULL,
    read boolean NOT NULL,
    hide boolean NOT NULL,
    created_date timestamp with time zone NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.notifications_notification OWNER TO postgres;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications_notification ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.notifications_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_comment (
    id bigint NOT NULL,
    text text NOT NULL,
    created_date timestamp with time zone NOT NULL,
    update_date timestamp with time zone NOT NULL,
    deleted boolean NOT NULL,
    lft integer NOT NULL,
    rght integer NOT NULL,
    tree_id integer NOT NULL,
    level integer NOT NULL,
    author_id bigint,
    parent_id bigint,
    post_id bigint NOT NULL,
    notification_id bigint,
    CONSTRAINT posts_comment_level_check CHECK ((level >= 0)),
    CONSTRAINT posts_comment_lft_check CHECK ((lft >= 0)),
    CONSTRAINT posts_comment_rght_check CHECK ((rght >= 0)),
    CONSTRAINT posts_comment_tree_id_check CHECK ((tree_id >= 0))
);


ALTER TABLE public.posts_comment OWNER TO postgres;

--
-- Name: posts_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_comment ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_image (
    id bigint NOT NULL,
    image character varying(100) NOT NULL,
    post_id bigint NOT NULL
);


ALTER TABLE public.posts_image OWNER TO postgres;

--
-- Name: posts_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_image ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_like (
    id bigint NOT NULL,
    object_id integer NOT NULL,
    content_type_id integer NOT NULL,
    user_id bigint NOT NULL,
    notification_id bigint,
    CONSTRAINT posts_like_object_id_check CHECK ((object_id >= 0))
);


ALTER TABLE public.posts_like OWNER TO postgres;

--
-- Name: posts_like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_like ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_post (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    text text NOT NULL,
    created_date timestamp with time zone NOT NULL,
    slug character varying(200) NOT NULL,
    avialable_comment boolean NOT NULL,
    author_id bigint NOT NULL,
    view_count integer NOT NULL,
    premium boolean NOT NULL
);


ALTER TABLE public.posts_post OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_post ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_readpost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_readpost (
    id bigint NOT NULL,
    read_post boolean NOT NULL,
    post_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.posts_readpost OWNER TO postgres;

--
-- Name: posts_readpost_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_readpost ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_readpost_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts_video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_video (
    id bigint NOT NULL,
    video character varying(100) NOT NULL,
    post_id bigint NOT NULL
);


ALTER TABLE public.posts_video OWNER TO postgres;

--
-- Name: posts_video_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.posts_video ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.posts_video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: taggit_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taggit_tag (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL
);


ALTER TABLE public.taggit_tag OWNER TO postgres;

--
-- Name: taggit_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.taggit_tag ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.taggit_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: taggit_taggeditem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taggit_taggeditem (
    id integer NOT NULL,
    object_id integer NOT NULL,
    content_type_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.taggit_taggeditem OWNER TO postgres;

--
-- Name: taggit_taggeditem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.taggit_taggeditem ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.taggit_taggeditem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: accounts_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_account (id, password, last_login, first_name, last_name, username, email, phone, date_register, last_join, is_admin, is_active, is_staff, is_superuser, avatar, description, url, birthday, gender, subscription) FROM stdin;
1	pbkdf2_sha256$720000$j6kpKJqSC52TzOKOEWIoCm$h4NUzftytPfELt9rC57i6R80e68FbETcNkHXbYpBMSE=	\N			Vylich	ilya.sidorenko.99@gmail.com		2024-04-03 11:05:04.377303+00	2024-04-03 11:05:04.377323+00	f	t	f	f				\N		\N
2	pbkdf2_sha256$720000$zVr0PltvrMf9sflPCJchVU$969GEVNhLn2NXibyHId+TmsKTie8u6VqNDZTSy8iPww=	\N	Роман	Карпин	Roman	romul.krp@gmail.com		2024-04-03 15:08:52.30417+00	2024-04-03 15:08:52.304189+00	f	t	f	f	avatar/Demon-angel.webp			\N		\N
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Учетная запись	6	add_account
22	Can change Учетная запись	6	change_account
23	Can delete Учетная запись	6	delete_account
24	Can view Учетная запись	6	view_account
25	Can add Пост	7	add_post
26	Can change Пост	7	change_post
27	Can delete Пост	7	delete_post
28	Can view Пост	7	view_post
29	Can add like	8	add_like
30	Can change like	8	change_like
31	Can delete like	8	delete_like
32	Can view like	8	view_like
33	Can add Комментарий	9	add_comment
34	Can change Комментарий	9	change_comment
35	Can delete Комментарий	9	delete_comment
36	Can view Комментарий	9	view_comment
37	Can add Изображение	10	add_image
38	Can change Изображение	10	change_image
39	Can delete Изображение	10	delete_image
40	Can view Изображение	10	view_image
41	Can add Видео	11	add_video
42	Can change Видео	11	change_video
43	Can delete Видео	11	delete_video
44	Can view Видео	11	view_video
45	Can add Прочитан	12	add_readpost
46	Can change Прочитан	12	change_readpost
47	Can delete Прочитан	12	delete_readpost
48	Can view Прочитан	12	view_readpost
49	Can add tag	13	add_tag
50	Can change tag	13	change_tag
51	Can delete tag	13	delete_tag
52	Can view tag	13	view_tag
53	Can add tagged item	14	add_taggeditem
54	Can change tagged item	14	change_taggeditem
55	Can delete tagged item	14	delete_taggeditem
56	Can view tagged item	14	view_taggeditem
57	Can add conversation	15	add_conversation
58	Can change conversation	15	change_conversation
59	Can delete conversation	15	delete_conversation
60	Can view conversation	15	view_conversation
61	Can add message	16	add_message
62	Can change message	16	change_message
63	Can delete message	16	delete_message
64	Can view message	16	view_message
65	Can add Уведомление	17	add_notification
66	Can change Уведомление	17	change_notification
67	Can delete Уведомление	17	delete_notification
68	Can view Уведомление	17	view_notification
69	Can add Подписка	18	add_follower
70	Can change Подписка	18	change_follower
71	Can delete Подписка	18	delete_follower
72	Can view Подписка	18	view_follower
\.


--
-- Data for Name: chat_conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_conversation (id, start_time, initiator_id, receiver_id) FROM stdin;
\.


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_message (id, text, attachment, "timestamp", conversation_id_id, sender_id, receiver_id, read) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	accounts	account
7	posts	post
8	posts	like
9	posts	comment
10	posts	image
11	posts	video
12	posts	readpost
13	taggit	tag
14	taggit	taggeditem
15	chat	conversation
16	chat	message
17	notifications	notification
18	followers	follower
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	accounts	0001_initial	2024-04-03 11:01:44.730925+00
2	accounts	0002_follower_follower_unique_follow	2024-04-03 11:01:44.769195+00
3	accounts	0003_alter_follower_author_alter_follower_unique_together	2024-04-03 11:01:44.781436+00
4	accounts	0004_account_avatar	2024-04-03 11:01:44.788227+00
5	accounts	0005_account_description_account_url	2024-04-03 11:01:44.80459+00
6	accounts	0006_alter_account_options_alter_account_url	2024-04-03 11:01:44.81459+00
7	accounts	0007_account_birthday_account_gender	2024-04-03 11:01:44.826612+00
8	accounts	0008_delete_follower	2024-04-03 11:01:44.833042+00
9	accounts	0009_alter_account_first_name_alter_account_last_name_and_more	2024-04-03 11:01:44.841825+00
10	accounts	0010_account_subscription	2024-04-03 11:01:44.846884+00
11	contenttypes	0001_initial	2024-04-03 11:01:44.858057+00
12	admin	0001_initial	2024-04-03 11:01:44.896192+00
13	admin	0002_logentry_remove_auto_add	2024-04-03 11:01:44.904538+00
14	admin	0003_logentry_add_action_flag_choices	2024-04-03 11:01:44.914077+00
15	contenttypes	0002_remove_content_type_name	2024-04-03 11:01:44.931492+00
16	auth	0001_initial	2024-04-03 11:01:44.998992+00
17	auth	0002_alter_permission_name_max_length	2024-04-03 11:01:45.010175+00
18	auth	0003_alter_user_email_max_length	2024-04-03 11:01:45.019023+00
19	auth	0004_alter_user_username_opts	2024-04-03 11:01:45.028045+00
20	auth	0005_alter_user_last_login_null	2024-04-03 11:01:45.037322+00
21	auth	0006_require_contenttypes_0002	2024-04-03 11:01:45.042402+00
22	auth	0007_alter_validators_add_error_messages	2024-04-03 11:01:45.051967+00
23	auth	0008_alter_user_username_max_length	2024-04-03 11:01:45.061286+00
24	auth	0009_alter_user_last_name_max_length	2024-04-03 11:01:45.070677+00
25	auth	0010_alter_group_name_max_length	2024-04-03 11:01:45.083578+00
26	auth	0011_update_proxy_permissions	2024-04-03 11:01:45.092737+00
27	auth	0012_alter_user_first_name_max_length	2024-04-03 11:01:45.099588+00
28	chat	0001_initial	2024-04-03 11:01:45.154026+00
29	chat	0002_message_receiver	2024-04-03 11:01:45.178191+00
30	chat	0003_message_read	2024-04-03 11:01:45.189508+00
31	notifications	0001_initial	2024-04-03 11:01:45.219646+00
32	followers	0001_initial	2024-04-03 11:01:45.275808+00
33	taggit	0001_initial	2024-04-03 11:01:45.352756+00
34	taggit	0002_auto_20150616_2121	2024-04-03 11:01:45.369711+00
35	taggit	0003_taggeditem_add_unique_index	2024-04-03 11:01:45.383113+00
36	taggit	0004_alter_taggeditem_content_type_alter_taggeditem_tag	2024-04-03 11:01:45.410902+00
37	taggit	0005_auto_20220424_2025	2024-04-03 11:01:45.418992+00
38	taggit	0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx	2024-04-03 11:01:45.43878+00
39	posts	0001_initial	2024-04-03 11:01:45.495133+00
40	posts	0002_comment	2024-04-03 11:01:45.531364+00
41	posts	0003_post_view_count	2024-04-03 11:01:45.548664+00
42	posts	0004_like	2024-04-03 11:01:45.597982+00
43	posts	0005_alter_like_user_alter_post_image	2024-04-03 11:01:45.628353+00
44	posts	0006_alter_post_image	2024-04-03 11:01:45.644962+00
45	posts	0007_alter_post_image	2024-04-03 11:01:45.661807+00
46	posts	0008_alter_post_image	2024-04-03 11:01:45.678786+00
47	posts	0009_delete_comment	2024-04-03 11:01:45.686394+00
48	posts	0010_comment	2024-04-03 11:01:45.749019+00
49	posts	0011_alter_comment_post	2024-04-03 11:01:45.768284+00
50	posts	0012_alter_comment_author	2024-04-03 11:01:45.793305+00
51	posts	0013_remove_post_image_image	2024-04-03 11:01:45.836092+00
52	posts	0014_alter_image_options_alter_image_post	2024-04-03 11:01:45.862821+00
53	posts	0015_image_video	2024-04-03 11:01:45.87531+00
54	posts	0016_remove_image_video_video	2024-04-03 11:01:45.918125+00
55	posts	0017_comment_notification_like_notification	2024-04-03 11:01:45.971192+00
56	posts	0018_readpost	2024-04-03 11:01:46.011603+00
57	posts	0019_alter_readpost_post	2024-04-03 11:01:46.037627+00
58	posts	0020_alter_post_options_post_premium	2024-04-03 11:01:46.07057+00
59	sessions	0001_initial	2024-04-03 11:01:46.103501+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: followers_follower; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.followers_follower (id, created_date, author_id, follower_id, notification_id) FROM stdin;
1	2024-04-03 18:52:40.494445+00	2	2	1
\.


--
-- Data for Name: notifications_notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications_notification (id, send, read, hide, created_date, user_id) FROM stdin;
1	t	t	f	2024-04-03 18:52:40.492947+00	2
\.


--
-- Data for Name: posts_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_comment (id, text, created_date, update_date, deleted, lft, rght, tree_id, level, author_id, parent_id, post_id, notification_id) FROM stdin;
\.


--
-- Data for Name: posts_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_image (id, image, post_id) FROM stdin;
1	photo_2024-03-26_09-09-40_WI69Fql.jpg	1
2	1707914542368.jpg	2
\.


--
-- Data for Name: posts_like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_like (id, object_id, content_type_id, user_id, notification_id) FROM stdin;
1	2	7	2	\N
\.


--
-- Data for Name: posts_post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_post (id, name, text, created_date, slug, avialable_comment, author_id, view_count, premium) FROM stdin;
1	пн	апвр	2024-04-03 11:07:22.11431+00	pn	t	1	15	f
2	дома и бани из бревна и бруса		2024-04-03 18:51:37.196327+00	doma-i-bani-iz-brevna-i-brusa	t	2	9	f
\.


--
-- Data for Name: posts_readpost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_readpost (id, read_post, post_id, user_id) FROM stdin;
1	f	1	1
2	f	1	2
4	f	2	2
\.


--
-- Data for Name: posts_video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts_video (id, video, post_id) FROM stdin;
\.


--
-- Data for Name: taggit_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taggit_tag (id, name, slug) FROM stdin;
1	нуке	нуке
2	123	123
\.


--
-- Data for Name: taggit_taggeditem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taggit_taggeditem (id, object_id, content_type_id, tag_id) FROM stdin;
1	1	7	1
2	2	7	2
\.


--
-- Name: accounts_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_account_id_seq', 2, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 72, true);


--
-- Name: chat_conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_conversation_id_seq', 1, false);


--
-- Name: chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_message_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 18, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 59, true);


--
-- Name: followers_follower_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.followers_follower_id_seq', 1, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, true);


--
-- Name: posts_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_comment_id_seq', 1, false);


--
-- Name: posts_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_image_id_seq', 3, true);


--
-- Name: posts_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_like_id_seq', 2, true);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 3, true);


--
-- Name: posts_readpost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_readpost_id_seq', 4, true);


--
-- Name: posts_video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_video_id_seq', 1, false);


--
-- Name: taggit_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taggit_tag_id_seq', 2, true);


--
-- Name: taggit_taggeditem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taggit_taggeditem_id_seq', 3, true);


--
-- Name: accounts_account accounts_account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_account
    ADD CONSTRAINT accounts_account_email_key UNIQUE (email);


--
-- Name: accounts_account accounts_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_account
    ADD CONSTRAINT accounts_account_pkey PRIMARY KEY (id);


--
-- Name: accounts_account accounts_account_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_account
    ADD CONSTRAINT accounts_account_username_key UNIQUE (username);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: chat_conversation chat_conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_conversation
    ADD CONSTRAINT chat_conversation_pkey PRIMARY KEY (id);


--
-- Name: chat_message chat_message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: followers_follower followers_follower_author_id_follower_id_ad96e5ed_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT followers_follower_author_id_follower_id_ad96e5ed_uniq UNIQUE (author_id, follower_id);


--
-- Name: followers_follower followers_follower_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT followers_follower_pkey PRIMARY KEY (id);


--
-- Name: notifications_notification notifications_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications_notification
    ADD CONSTRAINT notifications_notification_pkey PRIMARY KEY (id);


--
-- Name: posts_comment posts_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_comment
    ADD CONSTRAINT posts_comment_pkey PRIMARY KEY (id);


--
-- Name: posts_image posts_image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_image
    ADD CONSTRAINT posts_image_pkey PRIMARY KEY (id);


--
-- Name: posts_like posts_like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_like
    ADD CONSTRAINT posts_like_pkey PRIMARY KEY (id);


--
-- Name: posts_post posts_post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_post
    ADD CONSTRAINT posts_post_pkey PRIMARY KEY (id);


--
-- Name: posts_post posts_post_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_post
    ADD CONSTRAINT posts_post_slug_key UNIQUE (slug);


--
-- Name: posts_readpost posts_readpost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_readpost
    ADD CONSTRAINT posts_readpost_pkey PRIMARY KEY (id);


--
-- Name: posts_video posts_video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_video
    ADD CONSTRAINT posts_video_pkey PRIMARY KEY (id);


--
-- Name: taggit_tag taggit_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_name_key UNIQUE (name);


--
-- Name: taggit_tag taggit_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_pkey PRIMARY KEY (id);


--
-- Name: taggit_tag taggit_tag_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_tag
    ADD CONSTRAINT taggit_tag_slug_key UNIQUE (slug);


--
-- Name: taggit_taggeditem taggit_taggeditem_content_type_id_object_id_tag_id_4bb97a8e_uni; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_content_type_id_object_id_tag_id_4bb97a8e_uni UNIQUE (content_type_id, object_id, tag_id);


--
-- Name: taggit_taggeditem taggit_taggeditem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_pkey PRIMARY KEY (id);


--
-- Name: followers_follower unique_follow; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT unique_follow UNIQUE (author_id, follower_id);


--
-- Name: accounts_account_email_348850e2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_account_email_348850e2_like ON public.accounts_account USING btree (email varchar_pattern_ops);


--
-- Name: accounts_account_username_b5f69a28_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_account_username_b5f69a28_like ON public.accounts_account USING btree (username varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: chat_conversation_initiator_id_cf561e19; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_conversation_initiator_id_cf561e19 ON public.chat_conversation USING btree (initiator_id);


--
-- Name: chat_conversation_receiver_id_ee505a93; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_conversation_receiver_id_ee505a93 ON public.chat_conversation USING btree (receiver_id);


--
-- Name: chat_message_conversation_id_id_68268054; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_message_conversation_id_id_68268054 ON public.chat_message USING btree (conversation_id_id);


--
-- Name: chat_message_receiver_id_0eceddde; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_message_receiver_id_0eceddde ON public.chat_message USING btree (receiver_id);


--
-- Name: chat_message_sender_id_991c686c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_message_sender_id_991c686c ON public.chat_message USING btree (sender_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: followers_follower_author_id_9c46477c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX followers_follower_author_id_9c46477c ON public.followers_follower USING btree (author_id);


--
-- Name: followers_follower_follower_id_166fad77; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX followers_follower_follower_id_166fad77 ON public.followers_follower USING btree (follower_id);


--
-- Name: followers_follower_notification_id_a7c2238d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX followers_follower_notification_id_a7c2238d ON public.followers_follower USING btree (notification_id);


--
-- Name: notifications_notification_user_id_b5e8c0ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_notification_user_id_b5e8c0ff ON public.notifications_notification USING btree (user_id);


--
-- Name: posts_comment_author_id_795e4d12; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_comment_author_id_795e4d12 ON public.posts_comment USING btree (author_id);


--
-- Name: posts_comment_notification_id_2eb0946a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_comment_notification_id_2eb0946a ON public.posts_comment USING btree (notification_id);


--
-- Name: posts_comment_parent_id_ae76dcba; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_comment_parent_id_ae76dcba ON public.posts_comment USING btree (parent_id);


--
-- Name: posts_comment_post_id_e81436d7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_comment_post_id_e81436d7 ON public.posts_comment USING btree (post_id);


--
-- Name: posts_comment_tree_id_3ecd2261; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_comment_tree_id_3ecd2261 ON public.posts_comment USING btree (tree_id);


--
-- Name: posts_image_post_id_6ed5e391; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_image_post_id_6ed5e391 ON public.posts_image USING btree (post_id);


--
-- Name: posts_like_content_type_id_e2a2fd9c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_like_content_type_id_e2a2fd9c ON public.posts_like USING btree (content_type_id);


--
-- Name: posts_like_notification_id_bc990359; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_like_notification_id_bc990359 ON public.posts_like USING btree (notification_id);


--
-- Name: posts_like_user_id_1d505823; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_like_user_id_1d505823 ON public.posts_like USING btree (user_id);


--
-- Name: posts_post_author_id_fe5487bf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_post_author_id_fe5487bf ON public.posts_post USING btree (author_id);


--
-- Name: posts_post_slug_6e9097e5_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_post_slug_6e9097e5_like ON public.posts_post USING btree (slug varchar_pattern_ops);


--
-- Name: posts_readpost_post_id_df3e37fb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_readpost_post_id_df3e37fb ON public.posts_readpost USING btree (post_id);


--
-- Name: posts_readpost_user_id_787eaf5a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_readpost_user_id_787eaf5a ON public.posts_readpost USING btree (user_id);


--
-- Name: posts_video_post_id_6e374cfd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_video_post_id_6e374cfd ON public.posts_video USING btree (post_id);


--
-- Name: taggit_tag_name_58eb2ed9_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_tag_name_58eb2ed9_like ON public.taggit_tag USING btree (name varchar_pattern_ops);


--
-- Name: taggit_tag_slug_6be58b2c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_tag_slug_6be58b2c_like ON public.taggit_tag USING btree (slug varchar_pattern_ops);


--
-- Name: taggit_tagg_content_8fc721_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_tagg_content_8fc721_idx ON public.taggit_taggeditem USING btree (content_type_id, object_id);


--
-- Name: taggit_taggeditem_content_type_id_9957a03c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_taggeditem_content_type_id_9957a03c ON public.taggit_taggeditem USING btree (content_type_id);


--
-- Name: taggit_taggeditem_object_id_e2d7d1df; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_taggeditem_object_id_e2d7d1df ON public.taggit_taggeditem USING btree (object_id);


--
-- Name: taggit_taggeditem_tag_id_f4f5b767; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX taggit_taggeditem_tag_id_f4f5b767 ON public.taggit_taggeditem USING btree (tag_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chat_conversation chat_conversation_initiator_id_cf561e19_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_conversation
    ADD CONSTRAINT chat_conversation_initiator_id_cf561e19_fk_accounts_account_id FOREIGN KEY (initiator_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chat_conversation chat_conversation_receiver_id_ee505a93_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_conversation
    ADD CONSTRAINT chat_conversation_receiver_id_ee505a93_fk_accounts_account_id FOREIGN KEY (receiver_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chat_message chat_message_conversation_id_id_68268054_fk_chat_conv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_conversation_id_id_68268054_fk_chat_conv FOREIGN KEY (conversation_id_id) REFERENCES public.chat_conversation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chat_message chat_message_receiver_id_0eceddde_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_receiver_id_0eceddde_fk_accounts_account_id FOREIGN KEY (receiver_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chat_message chat_message_sender_id_991c686c_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message
    ADD CONSTRAINT chat_message_sender_id_991c686c_fk_accounts_account_id FOREIGN KEY (sender_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_accounts_account_id FOREIGN KEY (user_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: followers_follower followers_follower_author_id_9c46477c_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT followers_follower_author_id_9c46477c_fk_accounts_account_id FOREIGN KEY (author_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: followers_follower followers_follower_follower_id_166fad77_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT followers_follower_follower_id_166fad77_fk_accounts_account_id FOREIGN KEY (follower_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: followers_follower followers_follower_notification_id_a7c2238d_fk_notificat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers_follower
    ADD CONSTRAINT followers_follower_notification_id_a7c2238d_fk_notificat FOREIGN KEY (notification_id) REFERENCES public.notifications_notification(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notifications_notification notifications_notifi_user_id_b5e8c0ff_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications_notification
    ADD CONSTRAINT notifications_notifi_user_id_b5e8c0ff_fk_accounts_ FOREIGN KEY (user_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_comment posts_comment_author_id_795e4d12_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_comment
    ADD CONSTRAINT posts_comment_author_id_795e4d12_fk_accounts_account_id FOREIGN KEY (author_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_comment posts_comment_notification_id_2eb0946a_fk_notificat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_comment
    ADD CONSTRAINT posts_comment_notification_id_2eb0946a_fk_notificat FOREIGN KEY (notification_id) REFERENCES public.notifications_notification(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_comment posts_comment_parent_id_ae76dcba_fk_posts_comment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_comment
    ADD CONSTRAINT posts_comment_parent_id_ae76dcba_fk_posts_comment_id FOREIGN KEY (parent_id) REFERENCES public.posts_comment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_comment posts_comment_post_id_e81436d7_fk_posts_post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_comment
    ADD CONSTRAINT posts_comment_post_id_e81436d7_fk_posts_post_id FOREIGN KEY (post_id) REFERENCES public.posts_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_image posts_image_post_id_6ed5e391_fk_posts_post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_image
    ADD CONSTRAINT posts_image_post_id_6ed5e391_fk_posts_post_id FOREIGN KEY (post_id) REFERENCES public.posts_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_like posts_like_content_type_id_e2a2fd9c_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_like
    ADD CONSTRAINT posts_like_content_type_id_e2a2fd9c_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_like posts_like_notification_id_bc990359_fk_notificat; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_like
    ADD CONSTRAINT posts_like_notification_id_bc990359_fk_notificat FOREIGN KEY (notification_id) REFERENCES public.notifications_notification(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_like posts_like_user_id_1d505823_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_like
    ADD CONSTRAINT posts_like_user_id_1d505823_fk_accounts_account_id FOREIGN KEY (user_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_post posts_post_author_id_fe5487bf_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_post
    ADD CONSTRAINT posts_post_author_id_fe5487bf_fk_accounts_account_id FOREIGN KEY (author_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_readpost posts_readpost_post_id_df3e37fb_fk_posts_post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_readpost
    ADD CONSTRAINT posts_readpost_post_id_df3e37fb_fk_posts_post_id FOREIGN KEY (post_id) REFERENCES public.posts_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_readpost posts_readpost_user_id_787eaf5a_fk_accounts_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_readpost
    ADD CONSTRAINT posts_readpost_user_id_787eaf5a_fk_accounts_account_id FOREIGN KEY (user_id) REFERENCES public.accounts_account(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: posts_video posts_video_post_id_6e374cfd_fk_posts_post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_video
    ADD CONSTRAINT posts_video_post_id_6e374cfd_fk_posts_post_id FOREIGN KEY (post_id) REFERENCES public.posts_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: taggit_taggeditem taggit_taggeditem_content_type_id_9957a03c_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_content_type_id_9957a03c_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: taggit_taggeditem taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggit_taggeditem
    ADD CONSTRAINT taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id FOREIGN KEY (tag_id) REFERENCES public.taggit_tag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

