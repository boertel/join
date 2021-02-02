import Head from 'next/head';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Venn from 'components/Venn';
import useShortcuts from 'components/useShortcuts';

const Hg = props => <span {...props} />;
const Big = props => <b {...props} />;
const Comment = props => (
  <span {...props} style={{color: 'var(--grey)', lineHeight: '28px'}} />
);
const Optional = props => <span {...props} style={{display: 'none'}} />;

const A = props => <Hg className="text-a text-bold" {...props} />;
const B = props => <Hg className="text-b text-bold" {...props} />;

export default function Home() {
  const {query} = useRouter();

  const tableA = query.red || 'A';
  const tableB = query.blue || 'B';

  const queries = [
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, true, false],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <B>{tableB}</B> IS NULL
          </u>
          ;
          <br />
          <Comment>-- or</Comment>
          <br />
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <u>OUTER</u> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, false, false],
    },

    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            FULL <Optional>OUTER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, true, true],
    },

    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            RIGHT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, true, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            RIGHT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <A>{tableA}</A>.value IS NULL
          </u>
          ;
          <br />
          <Comment>-- or</Comment>
          <br />
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            RIGHT <u>OUTER</u> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, false, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            FULL <Optional>OUTER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <A>{tableA}</A>.value IS NULL OR <B>{tableB}</B>.value IS NULL
          </u>
          ;
        </>
      ),
      circles: [true, false, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A> <Big>INNER JOIN</Big> <B>{tableB}</B> ON{' '}
          <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, true, false],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState();

  const select = index => () => {
    setCurrentIndex(index);
  };

  const current = queries[currentIndex];
  const circles = current?.circles || [false, false, false];

  const toggle = idx => {
    const update = [...circles];
    update[idx] = !circles[idx];
    const found = queries.findIndex(
      ({circles}) =>
        circles[0] === update[0] &&
        circles[1] === update[1] &&
        circles[2] === update[2],
    );
    setCurrentIndex(found);
  };

  useShortcuts(setCurrentIndex);

  return (
    <>
      <Head>
        <title>JOINs</title>
      </Head>
      <h1 style={{textAlign: 'center'}}>
        If you can't beat 'em,{' '}
        <code style={{padding: '4px'}}>
          <a
            className="invisible"
            href="https://www.youtube.com/watch?v=6ENsh4thPFA"
            target="_blank"
            rel="noopener noreferrer nofollow">
            JOIN
          </a>
        </code>{' '}
        'em!
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
          padding: '0 12px',
          position: 'sticky',
          backgroundColor: 'var(--bg)',
          top: 0,
        }}>
        <Venn
          tableA={tableA}
          tableB={tableB}
          circles={circles}
          toggle={toggle}
        />
      </div>
      <div
        style={{
          display: 'grid',
          marginTop: '40px',
        }}>
        {queries.map((query, index) => (
          <code
            className={index === currentIndex ? 'active' : null}
            key={index}
            onClick={select(index)}
            style={{
              padding: '18px',
              cursor: 'pointer',
              margin: '6px 0',
            }}>
            {query.sql}
          </code>
        ))}
      </div>
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '12px',
        }}>
        Built by{' '}
        <a href="https://ben.oertel.fr/" target="_blank">
          Benjamin Oertel
        </a>
      </div>
    </>
  );
}
